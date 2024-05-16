import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';

// Authentication check function
const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

interface ProtectedRouteProps {
  component: ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
