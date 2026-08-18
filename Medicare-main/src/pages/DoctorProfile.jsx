import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Clock, 
  Award, 
  Calendar, 
  User,
  Phone,
  Mail,
  Stethoscope,
  GraduationCap,
  Languages,
  DollarSign
} from 'lucide-react';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);

  // Sample doctor data (in real app, fetch from API)
  const sampleDoctor = {
    _id: id,
    userId: {
      name: 'Riya Jaiswal',
      email: 'riya@medicare.com',
      phone: '+91 98765 43210',
      avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    specialization: 'Cardiology',
    experience: 15,
    consultationFee: 800,
    rating: 4.9,
    totalRatings: 245,
    totalPatients: 1200,
    hospital: {
      name: 'Apollo Hospital',
      city: 'Mumbai',
      address: 'Bandra West, Mumbai'
    },
    qualifications: [
      { degree: 'MBBS', institution: 'AIIMS Delhi', year: 2005 },
      { degree: 'MD Cardiology', institution: 'PGI Chandigarh', year: 2008 }
    ],
    bio: 'Experienced cardiologist with expertise in interventional cardiology and heart surgeries. Dr. Kumar has been practicing for over 15 years and has successfully treated thousands of patients.',
    languages: ['Hindi', 'English', 'Marathi'],
    isVerified: true,
    isAcceptingPatients: true,
    availability: [
      { day: 'monday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
      { day: 'tuesday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
      { day: 'wednesday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
      { day: 'thursday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
      { day: 'friday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
      { day: 'saturday', slots: ['09:00', '10:00', '11:00'] }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDoctor(sampleDoctor);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  useEffect(() => {
    if (selectedDate && doctor) {
      const dayName = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      const dayAvailability = doctor.availability.find(day => day.day === dayName);
      setAvailableSlots(dayAvailability ? dayAvailability.slots : []);
    }
  }, [selectedDate, doctor]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleBookAppointment = () => {
    navigate(`/book-appointment/${doctor._id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading doctor profile...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-gray-600">Doctor not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Doctor Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="relative">
              <img
                src={doctor.userId.avatar}
                alt={doctor.userId.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
              />
              {doctor.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2">
                  <Award className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Dr. {doctor.userId.name}
                  </h1>
                  <p className="text-xl text-blue-600 font-semibold mb-3">{doctor.specialization}</p>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      {renderStars(doctor.rating)}
                      <span className="ml-2 text-gray-600">
                        {doctor.rating} ({doctor.totalRatings} reviews)
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{doctor.hospital.name}, {doctor.hospital.city}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span>{doctor.totalPatients} patients treated</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{doctor.userId.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{doctor.userId.email}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">₹{doctor.consultationFee}</p>
                    <p className="text-sm text-gray-600">per consultation</p>
                  </div>
                  <div className="mt-4">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      doctor.isAcceptingPatients 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {doctor.isAcceptingPatients ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Doctor Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Stethoscope className="h-5 w-5 mr-2 text-blue-600" />
                About Dr. {doctor.userId.name}
              </h2>
              <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
            </div>

            {/* Qualifications */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                Qualifications
              </h2>
              <div className="space-y-3">
                {doctor.qualifications.map((qual, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{qual.degree}</p>
                      <p className="text-gray-600">{qual.institution}</p>
                    </div>
                    <span className="text-blue-600 font-semibold">{qual.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Languages className="h-5 w-5 mr-2 text-blue-600" />
                Languages Spoken
              </h2>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((language, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="space-y-6">
            {/* Quick Booking */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Book Appointment
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {selectedDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Slots
                    </label>
                    {availableSlots.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {availableSlots.map((slot, index) => (
                          <button
                            key={index}
                            className="px-3 py-2 text-sm border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No slots available for this date</p>
                    )}
                  </div>
                )}

                <button
                  onClick={handleBookAppointment}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  Book Appointment
                </button>
              </div>
            </div>

            {/* Hospital Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Hospital Information
              </h2>
              <div className="space-y-2">
                <p className="font-semibold text-gray-900">{doctor.hospital.name}</p>
                <p className="text-gray-600">{doctor.hospital.address}</p>
                <p className="text-gray-600">{doctor.hospital.city}</p>
              </div>
            </div>

            {/* Consultation Fee */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                Consultation Fee
              </h2>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">₹{doctor.consultationFee}</p>
                <p className="text-gray-600">per consultation</p>
                <p className="text-sm text-gray-500 mt-2">
                  * Additional charges may apply for procedures
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;