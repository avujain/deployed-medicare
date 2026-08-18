import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Users, 
  DollarSign, 
  Activity,
  Star,
  TrendingUp,
  Bell,
  Video,
  Phone,
  MessageCircle,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    monthlyRevenue: 0,
    rating: 0,
    pendingAppointments: 0
  });
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);

  // Sample data
  const sampleAppointments = [
    {
      id: 1,
      patientName: 'Rahul Sharma',
      age: 35,
      gender: 'Male',
      time: '10:00 AM',
      type: 'video',
      problem: 'Chest Pain',
      status: 'confirmed',
      phone: '+91 98765 43210'
    },
    {
      id: 2,
      patientName: 'Priya Patel',
      age: 28,
      gender: 'Female',
      time: '11:30 AM',
      type: 'in-person',
      problem: 'Routine Checkup',
      status: 'confirmed',
      phone: '+91 98765 43211'
    },
    {
      id: 3,
      patientName: 'Amit Kumar',
      age: 42,
      gender: 'Male',
      time: '2:00 PM',
      type: 'video',
      problem: 'Follow-up Visit',
      status: 'pending',
      phone: '+91 98765 43212'
    }
  ];

  const samplePendingRequests = [
    {
      id: 1,
      patientName: 'Sunita kumari',
      age: 45,
      gender: 'Female',
      problem: 'High Blood Pressure',
      requestedDate: '2024-01-22',
      requestedTime: '3:00 PM',
      phone: '+91 98765 43213'
    },
    {
      id: 2,
      patientName: 'Vikram Singh',
      age: 38,
      gender: 'Male',
      problem: 'Heart Palpitations',
      requestedDate: '2024-01-23',
      requestedTime: '10:00 AM',
      phone: '+91 98765 43214'
    }
  ];

  const samplePayments = [
    {
      id: 1,
      patientName: 'Rahul Sharma',
      amount: 800,
      date: '2024-01-18',
      transactionId: 'TXN123456789',
      status: 'completed'
    },
    {
      id: 2,
      patientName: 'Priya Patel',
      amount: 800,
      date: '2024-01-17',
      transactionId: 'TXN123456788',
      status: 'completed'
    },
    {
      id: 3,
      patientName: 'Amit Kumar',
      amount: 800,
      date: '2024-01-16',
      transactionId: 'TXN123456787',
      status: 'pending'
    }
  ];

  useEffect(() => {
    // Simulate API calls
    setStats({
      totalPatients: 1200,
      todayAppointments: 8,
      monthlyRevenue: 45000,
      rating: 4.9,
      pendingAppointments: 2
    });
    setTodayAppointments(sampleAppointments);
    setPendingRequests(samplePendingRequests);
    setRecentPayments(samplePayments);
  }, []);

  const handleAppointmentAction = (appointmentId, action) => {
    if (action === 'accept') {
      setPendingRequests(prev => prev.filter(req => req.id !== appointmentId));
      // In real app, make API call to accept appointment
      alert('Appointment accepted successfully!');
    } else if (action === 'decline') {
      setPendingRequests(prev => prev.filter(req => req.id !== appointmentId));
      // In real app, make API call to decline appointment
      alert('Appointment declined.');
    }
  };

  const updateAppointmentStatus = (appointmentId, newStatus) => {
    setTodayAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      )
    );
    alert(`Appointment status updated to ${newStatus}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Good morning, Dr. {user?.name}! 👨‍⚕️
          </h1>
          <p className="text-gray-600 mt-2">Here's your practice overview for today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPatients}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayAppointments}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-gray-900 mr-2">{stats.rating}</p>
                  <div className="flex">
                    {renderStars(stats.rating)}
                  </div>
                </div>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingAppointments}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Bell className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Appointments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Today's Appointments</h2>
              </div>
              <div className="p-6">
                {todayAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No appointments scheduled for today</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                              <p className="text-gray-600 text-sm">{appointment.age} years, {appointment.gender}</p>
                              <div className="flex items-center text-gray-600 text-sm mt-1">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{appointment.time}</span>
                                <span className="mx-2">•</span>
                                <span>{appointment.type === 'video' ? 'Video Call' : 'In-Person'}</span>
                              </div>
                              <p className="text-sm text-gray-700 mt-1">
                                <strong>Problem:</strong> {appointment.problem}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                            <div className="mt-2 flex space-x-2">
                              {appointment.type === 'video' ? (
                                <button
                                  onClick={() => window.open(`/video-consultation/${appointment.videoRoomId || appointment.id}`, '_blank')}
                                  className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                                >
                                  <Video className="h-3 w-3 inline mr-1" />
                                  Start Video
                                </button>
                              ) : (
                                <button
                                  onClick={() => window.open(`tel:${appointment.phone || '+91-98765-43210'}`, '_self')}
                                  className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                                >
                                  <Phone className="h-3 w-3 inline mr-1" />
                                  Call Patient
                                </button>
                              )}
                              <button 
                                onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                                className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
                              >
                                <CheckCircle className="h-3 w-3 inline mr-1" />
                                Complete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pending Appointment Requests */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Pending Appointment Requests</h2>
              </div>
              <div className="p-6">
                {pendingRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No pending requests</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingRequests.map((request) => (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{request.patientName}</h3>
                            <p className="text-gray-600 text-sm">{request.age} years, {request.gender}</p>
                            <p className="text-sm text-gray-700 mt-1">
                              <strong>Problem:</strong> {request.problem}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              <strong>Requested:</strong> {new Date(request.requestedDate).toLocaleDateString()} at {request.requestedTime}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleAppointmentAction(request.id, 'accept')}
                              className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                            >
                              <CheckCircle className="h-3 w-3 inline mr-1" />
                              Accept
                            </button>
                            <button
                              onClick={() => handleAppointmentAction(request.id, 'decline')}
                              className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                            >
                              <XCircle className="h-3 w-3 inline mr-1" />
                              Decline
                            </button>
                          </div>
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
            {/* Recent Payments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Payments</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{payment.patientName}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(payment.date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID: {payment.transactionId}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">₹{payment.amount}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          payment.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/appointments')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  View Schedule
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Patient Records
                </button>
                <button
                  onClick={() => navigate('/appointments')}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Payment History
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Analytics
                </button>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                This Month
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Appointments</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue</span>
                  <span className="font-semibold">₹{stats.monthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">New Patients</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Satisfaction</span>
                  <span className="font-semibold">{stats.rating}/5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;