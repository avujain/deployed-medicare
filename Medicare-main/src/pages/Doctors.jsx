import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Star, 
  Calendar, 
  Filter,
  User,
  Clock,
  DollarSign,
  Video,
  Award,
  Eye
} from 'lucide-react';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Sample Indian doctors data
  const sampleDoctors = [
    {
      _id: '1',
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
      bio: 'Experienced cardiologist with expertise in interventional cardiology and heart surgeries.',
      languages: ['Hindi', 'English', 'Marathi'],
      isVerified: true,
      isAcceptingPatients: true
    },
    {
      _id: '2',
      userId: {
        name: 'Priya Sharma',
        email: 'priya@medicare.com',
        phone: '+91 98765 43211',
        avatar: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      specialization: 'Dermatology',
      experience: 12,
      consultationFee: 600,
      rating: 4.8,
      totalRatings: 189,
      totalPatients: 890,
      hospital: {
        name: 'Max Hospital',
        city: 'Delhi',
        address: 'Saket, New Delhi'
      },
      qualifications: [
        { degree: 'MBBS', institution: 'Lady Hardinge Medical College', year: 2008 },
        { degree: 'MD Dermatology', institution: 'AIIMS Delhi', year: 2011 }
      ],
      bio: 'Specialist in cosmetic dermatology and skin disorders with modern treatment approaches.',
      languages: ['Hindi', 'English', 'Punjabi'],
      isVerified: true,
      isAcceptingPatients: true
    },
    {
      _id: '3',
      userId: {
        name: 'Amit Patel',
        email: 'amit@medicare.com',
        phone: '+91 98765 43212',
        avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      specialization: 'Orthopedics',
      experience: 18,
      consultationFee: 900,
      rating: 4.7,
      totalRatings: 312,
      totalPatients: 1500,
      hospital: {
        name: 'Fortis Hospital',
        city: 'Bangalore',
        address: 'Bannerghatta Road, Bangalore'
      },
      qualifications: [
        { degree: 'MBBS', institution: 'Bangalore Medical College', year: 2002 },
        { degree: 'MS Orthopedics', institution: 'NIMHANS Bangalore', year: 2005 }
      ],
      bio: 'Expert in joint replacement surgeries and sports medicine with international training.',
      languages: ['Hindi', 'English', 'Kannada', 'Gujarati'],
      isVerified: true,
      isAcceptingPatients: true
    },
    {
      _id: '4',
      userId: {
        name: 'Sunita Reddy',
        email: 'sunita@medicare.com',
        phone: '+91 98765 43213',
        avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      specialization: 'Pediatrics',
      experience: 14,
      consultationFee: 500,
      rating: 4.9,
      totalRatings: 278,
      totalPatients: 2000,
      hospital: {
        name: 'Rainbow Children Hospital',
        city: 'Hyderabad',
        address: 'Banjara Hills, Hyderabad'
      },
      qualifications: [
        { degree: 'MBBS', institution: 'Osmania Medical College', year: 2006 },
        { degree: 'MD Pediatrics', institution: 'NIMS Hyderabad', year: 2009 }
      ],
      bio: 'Dedicated pediatrician specializing in child development and vaccination programs.',
      languages: ['Hindi', 'English', 'Telugu'],
      isVerified: true,
      isAcceptingPatients: true
    },
    {
      _id: '5',
      userId: {
        name: 'Vikram Singh',
        email: 'vikram@medicare.com',
        phone: '+91 98765 43214',
        avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      specialization: 'Neurology',
      experience: 20,
      consultationFee: 1200,
      rating: 4.8,
      totalRatings: 156,
      totalPatients: 800,
      hospital: {
        name: 'AIIMS',
        city: 'Delhi',
        address: 'Ansari Nagar, New Delhi'
      },
      qualifications: [
        { degree: 'MBBS', institution: 'AIIMS Delhi', year: 2000 },
        { degree: 'DM Neurology', institution: 'AIIMS Delhi', year: 2004 }
      ],
      bio: 'Senior neurologist with expertise in stroke management and neurological disorders.',
      languages: ['Hindi', 'English'],
      isVerified: true,
      isAcceptingPatients: true
    },
    {
      _id: '6',
      userId: {
        name: 'Meera Joshi',
        email: 'meera@medicare.com',
        phone: '+91 98765 43215',
        avatar: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      specialization: 'Gynecology',
      experience: 16,
      consultationFee: 700,
      rating: 4.9,
      totalRatings: 234,
      totalPatients: 1100,
      hospital: {
        name: 'Kokilaben Hospital',
        city: 'Mumbai',
        address: 'Andheri West, Mumbai'
      },
      qualifications: [
        { degree: 'MBBS', institution: 'Grant Medical College', year: 2004 },
        { degree: 'MS Gynecology', institution: 'KEM Hospital Mumbai', year: 2007 }
      ],
      bio: 'Experienced gynecologist specializing in high-risk pregnancies and minimally invasive surgeries.',
      languages: ['Hindi', 'English', 'Marathi'],
      isVerified: true,
      isAcceptingPatients: true
    }
  ];

  const specialties = [
    'Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology',
    'General Medicine', 'Neurology', 'Orthopedics', 'Pediatrics',
    'Psychiatry', 'Radiology', 'Surgery', 'Urology', 'Gynecology'
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDoctors(sampleDoctors);
      setFilteredDoctors(sampleDoctors);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [doctors, searchTerm, selectedSpecialty, selectedCity, minRating]);

  const filterDoctors = () => {
    let filtered = doctors;

    if (searchTerm) {
      filtered = filtered.filter(doctor => 
        doctor.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSpecialty) {
      filtered = filtered.filter(doctor => 
        doctor.specialization === selectedSpecialty
      );
    }

    if (selectedCity) {
      filtered = filtered.filter(doctor => 
        doctor.hospital?.city?.toLowerCase().includes(selectedCity.toLowerCase())
      );
    }

    if (minRating > 0) {
      filtered = filtered.filter(doctor => doctor.rating >= minRating);
    }

    setFilteredDoctors(filtered);
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Best Doctors</h1>
          <p className="text-gray-600">Connect with India's top certified healthcare professionals</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors or specialties..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="City"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            />

            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
            >
              <option value={0}>All Ratings</option>
              <option value={4}>4+ Stars</option>
              <option value={4.5}>4.5+ Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <img
                    src={doctor.userId?.avatar}
                    alt={doctor.userId?.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                  {doctor.isVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                      <Award className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Dr. {doctor.userId?.name}
                      </h3>
                      <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          {renderStars(doctor.rating)}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {doctor.rating} ({doctor.totalRatings} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">
                        ₹{doctor.consultationFee}
                      </p>
                      <p className="text-sm text-gray-600">per consultation</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{doctor.hospital?.name}, {doctor.hospital?.city}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      <span>{doctor.totalPatients} patients treated</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        doctor.isAcceptingPatients 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {doctor.isAcceptingPatients ? 'Available' : 'Not Available'}
                      </span>
                      {doctor.isVerified && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/doctor/${doctor._id}`}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </Link>
                      <Link
                        to={`/book-appointment/${doctor._id}`}
                        className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Appointment
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No doctors found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;