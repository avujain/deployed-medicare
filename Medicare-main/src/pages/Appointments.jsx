import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, 
  Clock, 
  User, 
  Video, 
  MapPin, 
  Star,
  Phone,
  Mail,
  FileText,
  Plus
} from 'lucide-react';

const Appointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('upcoming');

  // Sample appointments data
  const sampleAppointments = [
    {
      _id: '1',
      patientId: {
        name: 'Sangeeta Kumari',
        email: 'sangeeta@example.com',
        phone: '+91 98765 43210'
      },
      doctorId: {
        userId: {
          name: 'Riya Jaiswal'
        },
        specialization: 'Cardiology',
        consultationFee: 800
      },
      appointmentDate: '2024-01-25',
      appointmentTime: '10:00',
      duration: 30,
      type: 'video',
      status: 'confirmed',
      reason: 'Chest Pain',
      symptoms: ['Chest discomfort', 'Shortness of breath'],
      fee: 800,
      paymentStatus: 'paid',
      videoRoomId: 'room-123'
    },
    {
      _id: '2',
      patientId: {
        name: 'Jagdish',
        email: 'jagdish@example.com',
        phone: '+91 98765 43211'
      },
      doctorId: {
        userId: {
          name: 'Priya Sharma'
        },
        specialization: 'Dermatology',
        consultationFee: 600
      },
      appointmentDate: '2024-01-20',
      appointmentTime: '14:00',
      duration: 30,
      type: 'in-person',
      status: 'completed',
      reason: 'Skin Consultation',
      symptoms: ['Acne', 'Skin irritation'],
      fee: 600,
      paymentStatus: 'paid'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAppointments(sampleAppointments);
      setIsLoading(false);
    }, 1000);
  }, []);

  const updateAppointmentStatus = (id, status) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt._id === id ? { ...apt, status } : apt
      )
    );
    alert(`Appointment status updated to ${status}`);
  };

  const filterAppointments = (status) => {
    const now = new Date();
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.appointmentDate);
      
      switch (status) {
        case 'upcoming':
          return (appointment.status === 'scheduled' || appointment.status === 'confirmed') && 
                 appointmentDate >= now;
        case 'past':
          return appointment.status === 'completed' || appointmentDate < now;
        case 'cancelled':
          return appointment.status === 'cancelled';
        default:
          return true;
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
            <p className="text-gray-600 mt-2">Manage your healthcare appointments</p>
          </div>
          <a
            href="/doctors"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Book Appointment
          </a>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setSelectedTab('upcoming')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming ({filterAppointments('upcoming').length})
            </button>
            <button
              onClick={() => setSelectedTab('past')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'past'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Past ({filterAppointments('past').length})
            </button>
            <button
              onClick={() => setSelectedTab('cancelled')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'cancelled'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Cancelled ({filterAppointments('cancelled').length})
            </button>
          </nav>
        </div>

        {/* Appointments List */}
        <div className="space-y-6">
          {filterAppointments(selectedTab).map((appointment) => (
            <div key={appointment._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {user?.role === 'doctor' 
                          ? appointment.patientId?.name 
                          : `Dr. ${appointment.doctorId?.userId?.name}`}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{formatDate(appointment.appointmentDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{formatTime(appointment.appointmentTime)}</span>
                      </div>
                      <div className="flex items-center">
                        {appointment.type === 'video' ? (
                          <Video className="h-4 w-4 mr-2" />
                        ) : (
                          <MapPin className="h-4 w-4 mr-2" />
                        )}
                        <span>{appointment.type === 'video' ? 'Video Consultation' : 'In-person Visit'}</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        <span>{appointment.reason}</span>
                      </div>
                    </div>
                    
                    {appointment.symptoms && appointment.symptoms.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">
                          <strong>Symptoms:</strong> {appointment.symptoms.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">₹{appointment.fee}</p>
                    <p className="text-sm text-gray-600">
                      {appointment.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {appointment.type === 'video' && (
                      <a
                        href={`/video-consultation/${appointment.videoRoomId || appointment._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        Join Video
                      </a>
                    )}
                    
                    {user?.role === 'doctor' && appointment.status === 'scheduled' && (
                      <button
                        onClick={() => updateAppointmentStatus(appointment._id, 'confirmed')}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        Confirm
                      </button>
                    )}
                    
                    {appointment.status === 'scheduled' && (
                      <button
                        onClick={() => updateAppointmentStatus(appointment._id, 'cancelled')}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filterAppointments(selectedTab).length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No appointments found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;