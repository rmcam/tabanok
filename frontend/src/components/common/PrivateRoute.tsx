import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'; // Eliminar useNavigate
import { useAuth } from '../../auth/hooks/useAuth'; // Import useAuth desde el hook
import Loading from './Loading';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[]; // Agregar requiredRoles de nuevo
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRoles }) => {
  // Incluir requiredRoles en las props
  const location = useLocation();
  const { user, loading } = useAuth(); // Eliminar el argumento navigate

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location, showSigninModal: true }} />;
  }

  // Descomentar la lógica de verificación de roles
  if (requiredRoles && user && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return loading ? <Loading /> : <>{children}</>;
};

export default PrivateRoute;
