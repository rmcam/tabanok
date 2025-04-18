import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

/**
 * Hook que redirige al login si el usuario no está autenticado
 * o no tiene los roles requeridos.
 * Útil para proteger componentes o páginas.
 */
export const useRequireAuth = (requiredRoles: string[] = []) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/login') {
      console.log('Redirigiendo a /login porque el usuario no está autenticado');
      navigate('/login');
      return;
    }

    if (requiredRoles.length > 0) {
      const hasRequiredRole = user?.roles?.some((role) => requiredRoles.includes(role));
      if (!hasRequiredRole) {
        console.log('Redirigiendo a /unauthorized porque el usuario no tiene los roles requeridos');
        navigate('/unauthorized');
      }
    }
  }, [isAuthenticated, user, navigate, requiredRoles, location.pathname]);
};
