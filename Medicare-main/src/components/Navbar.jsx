import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Plus, 
  Menu, 
  X, 
  User, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut,
  Shield,
  Home,
  Stethoscope,
  Search,
  Phone,
  HelpCircle
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Medicare
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <button 
              onClick={() => scrollToSection('services')}
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              <Stethoscope className="h-4 w-4" />
              <span>Services</span>
            </button>
            <Link 
              to="/doctors" 
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              <Search className="h-4 w-4" />
              <span>Find Doctor</span>
            </Link>
            <button 
              onClick={() => scrollToSection('contact')}
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              <Phone className="h-4 w-4" />
              <span>Contact</span>
            </button>
            <button 
              onClick={() => scrollToSection('faqs')}
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              <HelpCircle className="h-4 w-4" />
              <span>FAQs</span>
            </button>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium">{user.name}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/appointments"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Appointments
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Admin Panel
                      </Link>
                    )}
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-blue-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 bg-white">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <button 
                onClick={() => scrollToSection('services')}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors text-left"
              >
                <Stethoscope className="h-4 w-4" />
                <span>Services</span>
              </button>
              <Link to="/doctors" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Search className="h-4 w-4" />
                <span>Find Doctor</span>
              </Link>
              <button 
                onClick={() => scrollToSection('contact')}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors text-left"
              >
                <Phone className="h-4 w-4" />
                <span>Contact</span>
              </button>
              <button 
                onClick={() => scrollToSection('faqs')}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors text-left"
              >
                <HelpCircle className="h-4 w-4" />
                <span>FAQs</span>
              </button>
              {!user && (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;