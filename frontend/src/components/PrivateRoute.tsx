import React, { ReactNode } from 'react';
import { useAuth } from '../features/auth/useAuth';
import { useRequireAuth } from '../features/auth/useRequireAuth';

interface PrivateRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
}

function PrivateRoute({ children, requiredRoles }: PrivateRouteProps) {
  console.log("PrivateRoute rendered");
  useRequireAuth(requiredRoles);
  const { loading: authLoading, isAuthenticated } = useAuth();

  if (authLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export default React.memo(PrivateRoute);
