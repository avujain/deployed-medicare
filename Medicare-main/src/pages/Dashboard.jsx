import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import PatientDashboard from './PatientDashboard';
import DoctorDashboard from './DoctorDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Render different dashboards based on user role
  if (user?.role === 'doctor') {
    return <DoctorDashboard />;
  } else {
    return <PatientDashboard />;
  }
};

export default Dashboard;