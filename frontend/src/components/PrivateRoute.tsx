import { Navigate } from 'react-router-dom';
import { useAuth, User } from '../features/auth/hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();
  const user = localStorage.getItem('user');
  const parsedUser: User = user ? JSON.parse(user) : null;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && parsedUser?.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default PrivateRoute;
