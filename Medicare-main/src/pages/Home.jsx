import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Heart, 
  Shield, 
  Clock, 
  Users, 
  Star, 
  Calendar, 
  Video, 
  FileText,
  Search,
  CheckCircle,
  ArrowRight,
  Stethoscope,
  Activity,
  Award,
  Phone,
  Mail,
  MapPin,
  Plus,
  Minus,
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const doctors = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      specialization: "Cardiologist",
      location: "Mumbai, Maharashtra",
      rating: 4.9,
      experience: "15 years",
      image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      specialization: "Dermatologist",
      location: "Delhi, NCR",
      rating: 4.8,
      experience: "12 years",
      image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      name: "Dr. Amit Patel",
      specialization: "Orthopedic",
      location: "Bangalore, Karnataka",
      rating: 4.7,
      experience: "18 years",
      image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const reviews = [
    {
      id: 1,
      name: "Anita Singh",
      rating: 5,
      review: "Excellent service! Dr. Kumar was very professional and the online consultation was smooth.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 2,
      name: "Rohit Gupta",
      rating: 5,
      review: "Great platform for booking appointments. Very user-friendly and efficient.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 3,
      name: "Meera Joshi",
      rating: 4,
      review: "Good experience overall. The doctors are qualified and the service is reliable.",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer: "You can book an appointment by searching for doctors, selecting your preferred doctor, and choosing an available time slot."
    },
    {
      question: "Is video consultation available?",
      answer: "Yes, we offer video consultations through Google Meet for your convenience and safety."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept various payment methods including UPI (Google Pay, Paytm), credit/debit cards, and net banking."
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel or reschedule your appointment up to 2 hours before the scheduled time."
    }
  ];

  const [openFaq, setOpenFaq] = React.useState(null);

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Health, Our
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"> Priority</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with India's best certified doctors, book appointments instantly, and manage your healthcare journey with ease. Experience modern healthcare at your fingertips.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/doctors"
                  className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  Find Doctors
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to={user ? "/appointments" : "/register"}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {user ? "Book Appointment" : "Get Started"}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Indian Doctor" 
                  className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
                <img 
                  src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Indian Doctor" 
                  className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 mt-8"
                />
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 mt-16 text-center">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Certified Doctors</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl font-bold text-teal-600 mb-2">50k+</div>
              <div className="text-gray-600">Happy Patients</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl font-bold text-purple-600 mb-2">100k+</div>
              <div className="text-gray-600">Appointments Booked</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Medicare?
            </h2>
            <p className="text-xl text-gray-600">
              Experience healthcare like never before with our comprehensive platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Find Best Doctors</h3>
              <p className="text-gray-600">
                Search and filter from 1000+ certified doctors by specialty, location, and availability to find the perfect match for your needs.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <div className="bg-gradient-to-r from-green-100 to-green-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Booking</h3>
              <p className="text-gray-600">
                Book appointments instantly with our intuitive calendar system and get confirmation within minutes.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <div className="bg-gradient-to-r from-purple-100 to-purple-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Video Consultations</h3>
              <p className="text-gray-600">
                Connect with doctors from the comfort of your home through secure Google Meet video consultations.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Digital Prescriptions</h3>
              <p className="text-gray-600">
                Get digital prescriptions and manage your medications easily with our secure platform.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <div className="bg-gradient-to-r from-red-100 to-red-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Activity className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Health Monitoring</h3>
              <p className="text-gray-600">
                Track your health records, appointments, and medical history all in one secure place.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <div className="bg-gradient-to-r from-teal-100 to-teal-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure & Private</h3>
              <p className="text-gray-600">
                Your health data is protected with enterprise-grade security and complete privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Healthcare Management Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Complete Healthcare Management
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Manage your entire healthcare journey in one secure platform. From finding doctors to storing medical records, 
                we've got you covered with the best healthcare experience in India.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  <span className="text-gray-700">Secure medical record storage</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  <span className="text-gray-700">Digital prescription management</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  <span className="text-gray-700">Appointment reminders via SMS/Email</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  <span className="text-gray-700">24/7 customer support</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg">
                <Shield className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
                <p className="text-gray-600">Your health data is protected with enterprise-grade security.</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-lg">
                <Clock className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Access</h3>
                <p className="text-gray-600">Access your health information anytime, anywhere.</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-lg">
                <Users className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Doctors</h3>
                <p className="text-gray-600">Connect with certified and experienced healthcare professionals.</p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg shadow-lg">
                <Star className="h-8 w-8 text-yellow-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Rated Service</h3>
                <p className="text-gray-600">Join thousands of satisfied patients who trust our platform.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Doctors Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Doctors
            </h2>
            <p className="text-xl text-gray-600">
              Consult with India's top certified healthcare professionals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-semibold">{doctor.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{doctor.specialization}</p>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{doctor.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Award className="h-4 w-4 mr-1" />
                    <span className="text-sm">{doctor.experience} experience</span>
                  </div>
                  <Link
                    to={`/doctor/${doctor.id}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 text-center block"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from our satisfied patients
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-4">
                  <img 
                    src={review.image} 
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{review.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl mb-4">
            Join thousands of patients who have already improved their healthcare experience with Medicare.
          </p>
          <p className="text-lg mb-8 opacity-90">
            Get instant access to certified doctors, book appointments online, and manage your health records securely. 
            Experience the future of healthcare in India today!
          </p>
          <Link
            to={user ? "/appointments" : "/register"}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center"
          >
            {user ? "Book Appointment" : "Get Started Today"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our services
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-gray-500 transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">
              We're here to help you with any questions or concerns
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">+91 98765 43210</p>
              <p className="text-gray-600">Mon-Fri 9AM-6PM</p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-green-100">
              <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">support@medicare.com</p>
              <p className="text-gray-600">24/7 Support</p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100">
              <MapPin className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">123 Health Street</p>
              <p className="text-gray-600">Uttar Pradesh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Medicare</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted healthcare partner providing quality medical services across India.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/doctors" className="text-gray-400 hover:text-white transition-colors">Find Doctors</Link></li>
                <li><Link to="/appointments" className="text-gray-400 hover:text-white transition-colors">Appointments</Link></li>
                <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors">Services</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Video Consultation</li>
                <li className="text-gray-400">Online Booking</li>
                <li className="text-gray-400">Digital Prescriptions</li>
                <li className="text-gray-400">Health Records</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">+91 98765 43210</li>
                <li className="text-gray-400">support@medicare.com</li>
                <li className="text-gray-400">Banaras, Uttar Pradesh</li>
                <li className="text-gray-400">Uttar Pradesh, India</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Medicare. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
