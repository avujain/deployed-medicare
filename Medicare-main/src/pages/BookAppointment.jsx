import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail,
  CreditCard,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: user?.name || '',
    age: '',
    gender: '',
    phone: user?.phone || '',
    email: user?.email || '',
    problem: '',
    problemDescription: '',
    appointmentDate: '',
    appointmentTime: '',
    consultationType: 'in-person'
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Sample doctor data
  const sampleDoctor = {
    _id: doctorId,
    userId: {
      name: 'Rajesh Kumar',
      avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    specialization: 'Cardiology',
    consultationFee: 800,
    availability: [
      { day: 'monday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
      { day: 'tuesday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
      { day: 'wednesday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
      { day: 'thursday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
      { day: 'friday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
      { day: 'saturday', slots: ['09:00', '10:00', '11:00'] }
    ]
  };

  const problemOptions = [
    'General Consultation',
    'Chest Pain',
    'Heart Palpitations',
    'High Blood Pressure',
    'Shortness of Breath',
    'Fatigue',
    'Dizziness',
    'Routine Checkup',
    'Follow-up Visit',
    'Other'
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDoctor(sampleDoctor);
      setIsLoading(false);
    }, 1000);
  }, [doctorId]);

  useEffect(() => {
    if (formData.appointmentDate && doctor) {
      const dayName = new Date(formData.appointmentDate).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      const dayAvailability = doctor.availability.find(day => day.day === dayName);
      setAvailableSlots(dayAvailability ? dayAvailability.slots : []);
    }
  }, [formData.appointmentDate, doctor]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSlotSelect = (slot) => {
    setFormData({
      ...formData,
      appointmentTime: slot
    });
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate step 1 fields
      if (!formData.patientName || !formData.age || !formData.gender || !formData.phone || !formData.email || !formData.problem) {
        alert('Please fill in all required fields');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate step 2 fields
      if (!formData.appointmentDate || !formData.appointmentTime) {
        alert('Please select date and time');
        return;
      }
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const loadStripeScript = () => {
    return new Promise((resolve) => {
      // Check if Stripe is already loaded
      if (window.Stripe) {
        resolve(true);
        return;
      }
      
      // Check if script is already being loaded
      if (document.querySelector('script[src="https://js.stripe.com/v3/"]')) {
        // Wait for existing script to load
        const checkStripe = setInterval(() => {
          if (window.Stripe) {
            clearInterval(checkStripe);
            resolve(true);
          }
        }, 100);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);

    try {
      const res = await loadStripeScript();
      if (!res) {
        alert('Stripe SDK failed to load. Please check your internet connection.');
        setIsProcessingPayment(false);
        return;
      }

      const stripe = window.Stripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'your_stripe_publishable_key');

      // Create payment intent with your existing server
      const response = await fetch('http://localhost:4242/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.accessToken || 'demo-token'}`,
        },
        body: JSON.stringify({
          doctorId: doctor._id,
          appointmentData: {
            ...formData,
            patientId: user?.id,
            fee: doctor.consultationFee
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            // For demo purposes, we'll use a test card
            number: '4242424242424242',
            exp_month: 12,
            exp_year: 2025,
            cvc: '123',
          },
          billing_details: {
            name: formData.patientName,
            email: formData.email,
            phone: formData.phone,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // Confirm payment on backend
      const confirmResponse = await fetch('http://localhost:4242/api/payments/confirm-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.accessToken || 'demo-token'}`,
        },
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id,
          appointmentData: formData
        }),
      });

      if (confirmResponse.ok) {
        alert('Payment successful! Appointment booked.');
        navigate('/appointments');
      } else {
        throw new Error('Failed to confirm appointment');
      }

    } catch (error) {
      console.error('Stripe payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointment booking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Doctor Profile
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Book Appointment</h1>
          <p className="text-gray-600 mt-2">Schedule your consultation with Dr. {doctor?.userId.name}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step ? <CheckCircle className="h-6 w-6" /> : step}
                </div>
                <span className={`ml-2 ${currentStep >= step ? 'text-blue-600' : 'text-gray-600'}`}>
                  {step === 1 ? 'Patient Details' : step === 2 ? 'Appointment' : 'Payment'}
                </span>
                {step < 3 && <div className="w-16 h-1 bg-gray-200 mx-4"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Step 1: Patient Details */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Patient Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="120"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Health Problem *
                  </label>
                  <select
                    name="problem"
                    value={formData.problem}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Problem</option>
                    {problemOptions.map((problem, index) => (
                      <option key={index} value={problem}>{problem}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Problem Description
                  </label>
                  <textarea
                    name="problemDescription"
                    value={formData.problemDescription}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Please describe your symptoms or concerns in detail..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={handleNextStep}
                  disabled={!formData.patientName || !formData.age || !formData.gender || !formData.phone || !formData.email || !formData.problem}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Appointment Details */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Appointment Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Type *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="consultationType"
                        value="in-person"
                        checked={formData.consultationType === 'in-person'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <div>
                        <p className="font-medium">In-Person Visit</p>
                        <p className="text-sm text-gray-600">Visit the clinic</p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="consultationType"
                        value="video"
                        checked={formData.consultationType === 'video'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <div>
                        <p className="font-medium">Video Consultation</p>
                        <p className="text-sm text-gray-600">Online consultation</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {formData.appointmentDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Time Slots *
                    </label>
                    {availableSlots.length > 0 ? (
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                        {availableSlots.map((slot, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSlotSelect(slot)}
                            className={`px-4 py-2 text-sm border rounded-lg transition-colors ${
                              formData.appointmentTime === slot
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                        <p className="text-yellow-800">No slots available for this date. Please select another date.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!formData.appointmentDate || !formData.appointmentTime}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Details</h2>
              
              {/* Appointment Summary */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Doctor:</p>
                    <p className="font-medium">Dr. {doctor.userId.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Specialization:</p>
                    <p className="font-medium">{doctor.specialization}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Patient:</p>
                    <p className="font-medium">{formData.patientName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Problem:</p>
                    <p className="font-medium">{formData.problem}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date & Time:</p>
                    <p className="font-medium">
                      {new Date(formData.appointmentDate).toLocaleDateString()} at {formData.appointmentTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Type:</p>
                    <p className="font-medium">{formData.consultationType === 'video' ? 'Video Consultation' : 'In-Person Visit'}</p>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Consultation Fee</span>
                    <span>₹{doctor.consultationFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span>₹0</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total Amount</span>
                      <span>₹{doctor.consultationFee}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium">Stripe Secure Payment</p>
                      <p className="text-sm text-gray-600">Pay securely with Credit/Debit Cards</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={isProcessingPayment}
                  className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay ₹{doctor.consultationFee}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;