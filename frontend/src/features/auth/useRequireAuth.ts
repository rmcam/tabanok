import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

/**
 * Hook que redirige al login si el usuario no está autenticado
 * o no tiene los roles requeridos.
 * Útil para proteger componentes o páginas.
 */
export function useRequireAuth(requiredRoles: string[] = []) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (
      requiredRoles.length > 0 &&
      !user?.roles?.some((role) => requiredRoles.includes(role))
    ) {
      navigate('/unauthorized');
    }
  }, [isAuthenticated, user, navigate, requiredRoles]);
}
