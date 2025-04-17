import React, { ReactNode } from 'react';
import { useAuth } from '../features/auth/useAuth';
import { useRequireAuth } from '../features/auth/useRequireAuth';

interface PrivateRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
}

function PrivateRoute({ children, requiredRoles }: PrivateRouteProps) {
  useRequireAuth(requiredRoles);
  const { loading: authLoading } = useAuth();

  if (authLoading) {
    return <div>Cargando...</div>;
  }

  return <>{children}</>;
}

export default PrivateRoute;
