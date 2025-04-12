import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/useAuth';
import type { AuthUser } from '../features/auth/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && !user?.roles?.includes(requiredRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default PrivateRoute;
