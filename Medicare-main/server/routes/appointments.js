import express from 'express';
import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get appointments for user
router.get('/', authenticate, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'patient') {
      query.patientId = req.user._id;
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ userId: req.user._id });
      if (doctor) {
        query.doctorId = doctor._id;
      }
    }
    
    const appointments = await Appointment.find(query)
      .populate('patientId', 'name email phone')
      .populate('doctorId')
      .sort({ appointmentDate: -1 });
    
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Book appointment
router.post('/', authenticate, async (req, res) => {
  try {
    const { doctorId, appointmentDate, appointmentTime, type, reason, symptoms } = req.body;
    
    // Get doctor info for fee
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    // Check if slot is available
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate,
      appointmentTime,
      status: { $in: ['scheduled', 'confirmed'] }
    });
    
    if (existingAppointment) {
      return res.status(400).json({ message: 'Time slot not available' });
    }
    
    // Create meeting link for video appointments
    let meetingLink = null;
    if (type === 'video') {
      const roomId = `${doctorId}-${req.user._id}-${Date.now()}`;
      meetingLink = `https://meet.google.com/${roomId}`;
    }
    
    const appointment = new Appointment({
      patientId: req.user._id,
      doctorId,
      appointmentDate,
      appointmentTime,
      type,
      reason,
      symptoms,
      fee: doctor.consultationFee,
      meetingLink
    });
    
    await appointment.save();
    
    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update appointment status
router.put('/:id/status', authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json({ message: 'Appointment status updated', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add appointment rating
router.post('/:id/rating', authenticate, async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { rating, feedback },
      { new: true }
    );
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Update doctor's rating
    const doctor = await Doctor.findById(appointment.doctorId);
    if (doctor) {
      const newTotalRatings = doctor.totalRatings + 1;
      const newRating = ((doctor.rating * doctor.totalRatings) + rating) / newTotalRatings;
      
      await Doctor.findByIdAndUpdate(appointment.doctorId, {
        rating: newRating,
        totalRatings: newTotalRatings
      });
    }
    
    res.json({ message: 'Rating submitted successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;