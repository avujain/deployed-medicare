import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  Activity,
  Heart,
  Plus,
  Bell,
  TrendingUp,
  MapPin,
  Phone,
  Video
} from 'lucide-react';

const PatientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalAppointments: 0,
    upcomingAppointments: 0,
    completedAppointments: 0,
    prescriptions: 0
  });
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentPrescriptions, setRecentPrescriptions] = useState([]);
  const [healthMetrics, setHealthMetrics] = useState({
    heartRate: 72,
    bloodPressure: '120/80',
    weight: 70,
    lastCheckup: '2024-01-15'
  });

  // Sample data
  const sampleAppointments = [
    {
      id: 1,
      doctorName: 'Dr. Rajesh Kumar',
      specialization: 'Cardiology',
      date: '2024-01-20',
      time: '10:00 AM',
      type: 'video',
      status: 'confirmed',
      hospital: 'Apollo Hospital, Mumbai'
    },
    {
      id: 2,
      doctorName: 'Dr. Priya Sharma',
      specialization: 'Dermatology',
      date: '2024-01-25',
      time: '2:00 PM',
      type: 'in-person',
      status: 'scheduled',
      hospital: 'Max Hospital, Delhi'
    }
  ];

  const samplePrescriptions = [
    {
      id: 1,
      doctorName: 'Dr. Rajesh Kumar',
      date: '2024-01-10',
      medications: ['Aspirin 75mg', 'Metoprolol 50mg'],
      diagnosis: 'Hypertension'
    },
    {
      id: 2,
      doctorName: 'Dr. Priya Sharma',
      date: '2024-01-05',
      medications: ['Tretinoin Cream', 'Clindamycin Gel'],
      diagnosis: 'Acne Treatment'
    }
  ];

  useEffect(() => {
    // Simulate API calls
    setStats({
      totalAppointments: 12,
      upcomingAppointments: 2,
      completedAppointments: 10,
      prescriptions: 8
    });
    setUpcomingAppointments(sampleAppointments);
    setRecentPrescriptions(samplePrescriptions);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">Here's your health dashboard overview</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAppointments}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">{stats.upcomingAppointments}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedAppointments}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Prescriptions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.prescriptions}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
                  <Link
                    to="/doctors"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center text-sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Book New
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No upcoming appointments</p>
                    <Link
                      to="/doctors"
                      className="text-blue-600 hover:text-blue-700 mt-2 inline-block"
                    >
                      Book your first appointment
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{appointment.doctorName}</h3>
                              <p className="text-blue-600 text-sm">{appointment.specialization}</p>
                              <div className="flex items-center text-gray-600 text-sm mt-1">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</span>
                              </div>
                              <div className="flex items-center text-gray-600 text-sm mt-1">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{appointment.hospital}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                            <div className="mt-2 flex space-x-2">
                              {appointment.type === 'video' ? (
                                <button 
                                  onClick={() => window.open(`/video-consultation/${appointment.id}`, '_blank')}
                                  className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                                >
                                  <Video className="h-3 w-3 inline mr-1" />
                                  Join Video
                                </button>
                              ) : (
                                <button 
                                  onClick={() => window.open(`tel:${appointment.hospital?.phone || '+91-98765-43210'}`, '_self')}
                                  className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                                >
                                  <Phone className="h-3 w-3 inline mr-1" />
                                  Call Clinic
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Prescriptions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Prescriptions</h2>
                  <Link
                    to="/prescriptions"
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    View All
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {recentPrescriptions.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No prescriptions yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentPrescriptions.map((prescription) => (
                      <div key={prescription.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{prescription.diagnosis}</h3>
                            <p className="text-gray-600 text-sm">by {prescription.doctorName}</p>
                            <div className="mt-2">
                              <p className="text-sm text-gray-700">Medications:</p>
                              <ul className="text-sm text-gray-600 mt-1">
                                {prescription.medications.map((med, index) => (
                                  <li key={index}>• {med}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(prescription.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Health Metrics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                Health Metrics
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Heart Rate</span>
                  <span className="font-semibold">{healthMetrics.heartRate} bpm</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Blood Pressure</span>
                  <span className="font-semibold">{healthMetrics.bloodPressure} mmHg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-semibold">{healthMetrics.weight} kg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Checkup</span>
                  <span className="font-semibold">
                    {new Date(healthMetrics.lastCheckup).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/doctors')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </button>
                <button
                  onClick={() => navigate('/appointments')}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  View Appointments
                </button>
                <button
                  onClick={() => navigate('/prescriptions')}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  My Prescriptions
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <User className="h-4 w-4 mr-2" />
                  Update Profile
                </button>
              </div>
            </div>

            {/* Health Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                Health Tip
              </h2>
              <p className="text-gray-700 text-sm">
                Regular exercise for at least 30 minutes a day can significantly improve your cardiovascular health and overall well-being. 
                Consider taking a brisk walk or doing light exercises daily.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;