import React, { useEffect } from 'react';
import useAuth from '../../auth/hooks/useAuth';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

interface User {
  id: number;
  email: string;
  role: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRoles }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth(navigate);

  useEffect(() => {
    if (!user && !loading) {
      navigate('/', { state: { from: location, showSigninModal: true } });
    }
  }, [user, loading, navigate, location]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return null; // Redirected to / in useEffect
  }

  if (requiredRoles && user && !requiredRoles.includes((user as User).role)) {
    return <Navigate to="/unauthorized" />;
  }

  return loading ? <div>Cargando...</div> : <>{children}</>;
};

export default PrivateRoute;
