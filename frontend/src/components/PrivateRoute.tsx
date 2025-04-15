import { useRequireAuth } from '../features/auth/useRequireAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

function PrivateRoute({ children, requiredRoles }: PrivateRouteProps) {
  useRequireAuth(requiredRoles);

  return children;
}

export default PrivateRoute;
