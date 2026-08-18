import express from 'express';
import Doctor from '../models/Doctor.js';
import User from '../models/User.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all doctors with filters
router.get('/', async (req, res) => {
  try {
    const { specialization, city, availability, rating } = req.query;
    
    let query = {};
    if (specialization) query.specialization = new RegExp(specialization, 'i');
    if (city) query['hospital.city'] = new RegExp(city, 'i');
    if (rating) query.rating = { $gte: Number(rating) };
    
    const doctors = await Doctor.find(query)
      .populate('userId', 'name email phone avatar')
      .sort({ rating: -1, totalRatings: -1 });
    
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('userId', 'name email phone avatar');
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create doctor profile
router.post('/', authenticate, authorize('doctor'), async (req, res) => {
  try {
    const doctorData = {
      userId: req.user._id,
      ...req.body
    };
    
    const doctor = new Doctor(doctorData);
    await doctor.save();
    
    res.status(201).json({ message: 'Doctor profile created', doctor });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update doctor profile
router.put('/:id', authenticate, authorize('doctor'), async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.json({ message: 'Doctor profile updated', doctor });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get doctor's availability
router.get('/:id/availability', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.json(doctor.availability);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;