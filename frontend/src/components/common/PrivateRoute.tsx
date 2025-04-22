import React from 'react';
import useAuth from '../../auth/hooks/useAuth';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { User } from '../../auth/types/authTypes';
import Loading from './Loading';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRoles }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth(navigate);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location, showSigninModal: true }} />;
  }

  if (requiredRoles && user && !requiredRoles.includes((user as User).role)) {
    return <Navigate to="/unauthorized" />;
  }

  return loading ? <Loading /> : <>{children}</>;
};

export default PrivateRoute;
