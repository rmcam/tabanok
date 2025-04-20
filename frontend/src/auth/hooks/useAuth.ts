import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { signin, signup, forgotPassword, SignupData, refreshToken } from '../services/authService';
import { AuthResponse, SigninData } from '../types/authTypes';
import { getToken, isAuthenticated, removeToken, saveToken, getRefreshToken, saveRefreshToken, removeRefreshToken } from '../utils/authUtils';

interface User {
  id: number;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  handleSignup: (data: SignupData) => Promise<boolean>;
  handleSignin: (data: SigninData) => Promise<boolean>;
  handleSignout: () => void;
  handleForgotPassword: (email: string) => Promise<void>;
}

const useAuth = (navigate: (path: string) => void) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      const refreshTokenValue = getRefreshToken();

      if (isAuthenticated()) {
        try {
          if (token) {
            const decoded = jwtDecode<{ id: number; email: string }>(token);
            const userData: User = {
              id: decoded.id,
              email: decoded.email,
            };
            setUser(userData);
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          // Attempt to refresh the token if it's expired
          if (refreshTokenValue) {
            try {
              const refreshedAuth = await refreshToken(refreshTokenValue);
              saveToken(refreshedAuth.accessToken);
              saveRefreshToken(refreshedAuth.refreshToken);

              const decoded = jwtDecode<{ id: number; email: string }>(refreshedAuth.accessToken);
              const userData: User = {
                id: decoded.id,
                email: decoded.email,
              };
              setUser(userData);
            } catch (refreshError) {
              console.error('Error refreshing token:', refreshError);
              handleSignout();
            }
          } else {
            handleSignout();
          }
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleSignup = async (data: SignupData) => {
    try {
      const response = await signup({
        email: data.email,
        password: data.password,
        username: data.email, // Usar el email como nombre de usuario por defecto
        firstName: '',
        secondName: '',
        firstLastName: '',
        secondLastName: '',
      });
      console.log('Respuesta del backend:', response); // Agregar log
      saveToken(response.accessToken);
      saveRefreshToken(response.refreshToken);
      const decoded = jwtDecode<{ id: number; email: string }>(response.accessToken);
      const userData: User = {
        id: decoded.id,
        email: decoded.email,
      };
      setUser(userData);
      navigate('/'); // Redirigir a la página principal
      return true; // Indica éxito
    } catch (error) {
      console.error('Error al registrarse:', error);
       // Verificar si el error tiene un mensaje específico del backend
       if (error instanceof Error && error.message) {
        alert(`Error al registrarse: ${error.message}`); // Mostrar mensaje al usuario
      } else {
        alert('Error al registrarse. Por favor, inténtalo de nuevo.'); // Mensaje genérico
      }
      return false; // Indica fallo
    }
  };

  const handleSignin = async (data: SigninData) => {
    try {
      const response: AuthResponse = await signin(data);
      saveToken(response.accessToken);
      saveRefreshToken(response.refreshToken);
      const decoded = jwtDecode<{ id: number; email: string }>(response.accessToken);
      const userData: User = {
        id: decoded.id,
        email: decoded.email,
      };
      setUser(userData);
      return true; // Indica éxito
    } catch (error: unknown) {
      console.error('Error al iniciar sesión:', error);
      // Verificar si el error tiene un mensaje específico del backend
      if (error instanceof Error && error.message) {
        alert(`Error al iniciar sesión: ${error.message}`); // Mostrar mensaje al usuario
      } else {
        alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.'); // Mensaje genérico
      }
      return false; // Indica fallo
    }
  };

  const handleSignout = () => {
    removeToken();
    removeRefreshToken();
    setUser(null);
  };

  const handleForgotPassword = async (email: string) => {
    try {
      await forgotPassword(email);
      alert('Se ha enviado un correo electrónico para restablecer tu contraseña.');
    } catch (error: unknown) {
      if (error instanceof Error && error.message) {
        alert(`Error al solicitar el restablecimiento de contraseña: ${error.message}`);
      } else {
        alert('Error al solicitar el restablecimiento de contraseña. Por favor, inténtalo de nuevo.');
      }
    }
  };

  return {
    user,
    loading,
    handleSignup,
    handleSignin,
    handleSignout,
    handleForgotPassword,
  };
};

export default useAuth;
