import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  FileText, 
  Calendar, 
  User, 
  Download, 
  Eye,
  Upload,
  Plus,
  Clock
} from 'lucide-react';

const Prescriptions = () => {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Sample prescriptions data
  const samplePrescriptions = [
    {
      _id: '1',
      diagnosis: 'Hypertension',
      doctorId: {
        userId: {
          name: 'Rajesh Kumar'
        }
      },
      patientId: {
        name: user?.name || 'John Doe'
      },
      medications: [
        {
          name: 'Amlodipine',
          dosage: '5mg',
          frequency: 'Once daily',
          duration: '30 days',
          instructions: 'Take with food'
        },
        {
          name: 'Metoprolol',
          dosage: '50mg',
          frequency: 'Twice daily',
          duration: '30 days',
          instructions: 'Take before meals'
        }
      ],
      notes: 'Monitor blood pressure regularly. Follow up in 2 weeks.',
      createdAt: '2024-01-15T10:00:00Z',
      validUntil: '2024-02-15T10:00:00Z',
      isActive: true
    },
    {
      _id: '2',
      diagnosis: 'Acute Bronchitis',
      doctorId: {
        userId: {
          name: 'Priya Sharma'
        }
      },
      patientId: {
        name: user?.name || 'John Doe'
      },
      medications: [
        {
          name: 'Azithromycin',
          dosage: '500mg',
          frequency: 'Once daily',
          duration: '5 days',
          instructions: 'Take on empty stomach'
        },
        {
          name: 'Salbutamol Inhaler',
          dosage: '2 puffs',
          frequency: 'As needed',
          duration: '15 days',
          instructions: 'Use when experiencing breathing difficulty'
        }
      ],
      notes: 'Rest and increase fluid intake. Avoid smoking.',
      createdAt: '2024-01-10T14:30:00Z',
      validUntil: '2024-01-25T14:30:00Z',
      isActive: false
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPrescriptions(samplePrescriptions);
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isExpired = (validUntil) => {
    return new Date(validUntil) < new Date();
  };

  const getPrescriptionStatus = (prescription) => {
    if (!prescription.isActive) return 'inactive';
    if (isExpired(prescription.validUntil)) return 'expired';
    return 'active';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
            <h1 className="text-3xl font-bold text-gray-900">Prescriptions</h1>
            <p className="text-gray-600 mt-2">View and manage your medical prescriptions</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            Upload Prescription
          </button>
        </div>

        {/* Prescriptions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {prescriptions.map((prescription) => {
            const status = getPrescriptionStatus(prescription);
            
            return (
              <div key={prescription._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {prescription.diagnosis}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Dr. {prescription.doctorId?.userId?.name}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(status)}`}>
                    {status}
                  </span>
                </div>

                {/* Prescription Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Prescribed: {formatDate(prescription.createdAt)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Valid until: {formatDate(prescription.validUntil)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    <span>Patient: {prescription.patientId?.name}</span>
                  </div>
                </div>

                {/* Medications */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Medications:</h4>
                  <div className="space-y-2">
                    {prescription.medications.slice(0, 2).map((med, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{med.name}</span>
                          <span className="text-sm text-gray-600">{med.dosage}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm text-gray-600">{med.frequency}</span>
                          <span className="text-sm text-gray-600">{med.duration}</span>
                        </div>
                      </div>
                    ))}
                    {prescription.medications.length > 2 && (
                      <p className="text-sm text-gray-500">
                        +{prescription.medications.length - 2} more medications
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedPrescription(prescription);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </button>
                  <button className="text-gray-600 hover:text-gray-700 transition-colors inline-flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {prescriptions.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No prescriptions found</p>
          </div>
        )}

        {/* Prescription Details Modal */}
        {showModal && selectedPrescription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Prescription Details
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Diagnosis</h3>
                    <p className="text-gray-700">{selectedPrescription.diagnosis}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Medications</h3>
                    <div className="space-y-3">
                      {selectedPrescription.medications.map((med, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-gray-900">{med.name}</p>
                              <p className="text-sm text-gray-600">Dosage: {med.dosage}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Frequency: {med.frequency}</p>
                              <p className="text-sm text-gray-600">Duration: {med.duration}</p>
                            </div>
                          </div>
                          {med.instructions && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-700">
                                <strong>Instructions:</strong> {med.instructions}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedPrescription.notes && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Notes</h3>
                      <p className="text-gray-700">{selectedPrescription.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prescriptions;