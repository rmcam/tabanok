import { useCallback } from 'react'; // Import useCallback
import { signin, signup, forgotPassword, SignupData, refreshToken } from '../services/authService';
import { AuthResponse, SigninData } from '../types/authTypes';
import { removeToken, saveToken, saveRefreshToken, removeRefreshToken } from '../utils/authUtils';

const useAuthService = () => {
  const handleSignup = useCallback(async (data: SignupData) => { // Wrap in useCallback
    try {
      const response = await signup({
        email: data.email,
        password: data.password,
        username: data.email, // Usar el email como nombre de usuario por defecto
        firstName: data.firstName,
        secondName: data.secondName,
        firstLastName: data.firstLastName,
        secondLastName: data.secondLastName,
      });
      console.log('Respuesta del backend:', response); // Agregar log
      saveToken(response.accessToken);
      saveRefreshToken(response.refreshToken);
      return response;
    } catch (error) {
      console.error('Error al registrarse:', error);
      // Verificar si el error tiene un mensaje específico del backend
      if (error instanceof Error && error.message) {
        alert(`Error al registrarse: ${error.message}`); // Mostrar mensaje al usuario
      } else {
        alert('Error al registrarse. Por favor, inténtalo de nuevo.'); // Mensaje genérico
      }
      throw error;
    }
  }, []); // Empty dependency array as there are no external dependencies

  const handleSignin = useCallback(async (data: SigninData) => { // Wrap in useCallback
    try {
      const response: AuthResponse = await signin({
        identifier: data.identifier,
        password: data.password,
      });
      saveToken(response.accessToken);
      saveRefreshToken(response.refreshToken);
      return response;
    } catch (error: unknown) {
      console.error('Error al iniciar sesión:', error);
      // Verificar si el error tiene un mensaje específico del backend
      if (error instanceof Error && error.message) {
        alert(`Error al iniciar sesión: ${error.message}`); // Mostrar mensaje al usuario
      } else {
        alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.'); // Mensaje genérico
      }
      throw error;
    }
  }, []); // Empty dependency array

  const handleForgotPassword = useCallback(async (email: string) => { // Wrap in useCallback
    try {
      await forgotPassword(email);
      alert('Se ha enviado un correo electrónico para restablecer tu contraseña.');
    } catch (error: unknown) {
      if (error instanceof Error && error.message) {
        alert(`Error al solicitar el restablecimiento de contraseña: ${error.message}`);
      } else {
        alert('Error al solicitar el restablecimiento de contraseña. Por favor, inténtalo de nuevo.');
      }
      throw error;
    }
  }, []); // Empty dependency array

  const handleRefreshToken = useCallback(async (refreshTokenValue: string) => { // Wrap in useCallback
    try {
      const refreshedAuth = await refreshToken(refreshTokenValue);
      saveToken(refreshedAuth.accessToken);
      saveRefreshToken(refreshedAuth.refreshToken);
      return refreshedAuth;
    } catch (refreshError) {
      console.error('Error refreshing token:', refreshError);
      removeToken();
      removeRefreshToken();
      throw refreshError;
    }
  }, []); // Empty dependency array

  const handleSignout = useCallback(() => { // Wrap in useCallback
    removeToken();
    removeRefreshToken();
  }, []); // Empty dependency array

  return {
    handleSignup,
    handleSignin,
    handleForgotPassword,
    handleRefreshToken,
    handleSignout,
  };
};

export default useAuthService;
