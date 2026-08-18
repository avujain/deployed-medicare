import express from 'express';
import multer from 'multer';
import Prescription from '../models/Prescription.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/prescriptions/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Get prescriptions for user
router.get('/', authenticate, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'patient') {
      query.patientId = req.user._id;
    }
    
    const prescriptions = await Prescription.find(query)
      .populate('doctorId')
      .populate('patientId', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create prescription
router.post('/', authenticate, async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    
    res.status(201).json({
      message: 'Prescription created successfully',
      prescription
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Upload prescription files
router.post('/:id/upload', authenticate, upload.array('files', 5), async (req, res) => {
  try {
    const files = req.files;
    const filePaths = files.map(file => file.path);
    
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { $push: { files: { $each: filePaths } } },
      { new: true }
    );
    
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    
    res.json({ message: 'Files uploaded successfully', prescription });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;