import { useRequireAuth } from '../features/auth/useRequireAuth';
import { useAuth } from '../features/auth/useAuth';
import React from 'react';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

// Remover units, loading, error si no se usan en este componente
function PrivateRoute({ children, requiredRoles }: PrivateRouteProps) {
  useRequireAuth(requiredRoles);
  const { loading: authLoading } = useAuth();

  if (authLoading) {
    return <div>Cargando...</div>;
  }

  return children;
}

export default PrivateRoute;
