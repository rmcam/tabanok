import { ReactNode, useEffect, useState, useMemo, useCallback } from 'react'; // Añadir useMemo y useCallback
import { AuthContext, AuthContextProps, AuthUser, RegisterData } from './AuthContext';
import * as authApi from './api';
import { isTokenExpired } from '../../lib/api';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar usuario desde localStorage al montar
  useEffect(() => {
    const storedUser = sessionStorage.getItem('authUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.token && isTokenExpired(user.token)) {
          sessionStorage.removeItem('authUser');
          setUser(null);
        } else {
          setUser(user);
        }
      } catch {
        sessionStorage.removeItem('authUser');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  // Guardar usuario en localStorage cuando cambie
  useEffect(() => {
    if (user) {
      console.log('Guardando usuario en sessionStorage:', user);
      sessionStorage.setItem('authUser', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('authUser');
    }
  }, [user]);

  // Memorizar funciones con useCallback
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const loggedUser = await authApi.login(email, password);
      setUser(loggedUser);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al iniciar sesión');
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []); // Dependencias vacías porque setLoading/setError/setUser son estables y authApi es un módulo importado

  const register = useCallback(async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      const registeredUser = await authApi.register(data);
      setUser(registeredUser);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al registrarse');
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []); // Dependencias vacías

  const logout = useCallback(() => {
    setUser(null);
    authApi.logout();
  }, []); // Dependencias vacías

  // Memorizar el valor del contexto con useMemo
  const value: AuthContextProps = useMemo(() => ({
    user,
    isAuthenticated: !!user, // Calcular isAuthenticated aquí
    login, // Funciones memorizadas
    register,
    logout,
    loading,
    error,
  }), [user, loading, error, login, register, logout]); // Dependencias del useMemo

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
