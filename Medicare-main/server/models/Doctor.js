import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  qualifications: [{
    degree: String,
    institution: String,
    year: Number
  }],
  experience: {
    type: Number,
    required: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  consultationFee: {
    type: Number,
    required: true
  },
  bio: {
    type: String,
    maxlength: 1000
  },
  languages: [String],
  availability: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    slots: [{
      startTime: String,
      endTime: String,
      isAvailable: {
        type: Boolean,
        default: true
      }
    }]
  }],
  hospital: {
    name: String,
    address: String,
    city: String,
    state: String
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  totalPatients: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAcceptingPatients: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Doctor', doctorSchema);