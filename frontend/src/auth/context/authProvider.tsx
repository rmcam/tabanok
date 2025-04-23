import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner'; // Importar toast de sonner
import useAuthService from '../hooks/useAuthService';
import { SigninData, SignupData, User } from '../types/authTypes'; // Importar User desde types
import {} from '../utils/authUtils';
import { AuthContext } from './authContext'; // Importar AuthContext y AuthContextType del nuevo archivo

const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  if (type === 'success') {
    toast.success(message);
  } else if (type === 'error') {
    toast.error(message);
  } else {
    toast.info(message);
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Estado de carga inicial
  const [signingIn, setSigningIn] = useState(false); // Estado de carga para signin
  const [signingUp, setSigningUp] = useState(false); // Estado de carga para signup
  const [requestingPasswordReset, setRequestingPasswordReset] = useState(false); // Estado de carga para forgotPassword

  const {
    handleSignup: signupService,
    handleSignin: signinService,
    handleForgotPassword: forgotPasswordService,
    // handleRefreshToken ya no es necesario en el frontend
    handleSignout: signoutService,
    verifySession: verifySessionService, // Importar la nueva función
  } = useAuthService();

  const signout = useCallback(() => {
    signoutService(); // Llama al servicio que interactúa con el backend para eliminar cookies
    setUser(null);
  }, [signoutService]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar la sesión usando el nuevo servicio que interactúa con el backend
        const authenticatedUser = await verifySessionService();
        setUser(authenticatedUser);
      } catch (error) {
        console.error('Error checking authentication session:', error);
        setUser(null); // Asegurarse de que el usuario sea null en caso de error
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [verifySessionService]); // Dependencia correcta

  const signup = async (data: SignupData) => {
    setSigningUp(true);
    try {
      await signupService({
        email: data.email,
        password: data.password,
        username: data.username,
        firstName: data.firstName,
        secondName: data.secondName,
        firstLastName: data.firstLastName,
        secondLastName: data.secondLastName,
      });
      // Después de un registro exitoso, verificar la sesión para obtener los datos del usuario
      const authenticatedUser = await verifySessionService();
      setUser(authenticatedUser);
      showToast('Registro exitoso. ¡Bienvenido!', 'success');
      return true; // Indica éxito
    } catch (error) {
      console.error('Error al registrarse:', error);
      const errorMessage =
        error instanceof Error && error.message
          ? error.message
          : 'Error al registrarse. Por favor, inténtalo de nuevo.';
      showToast(errorMessage, 'error');
      throw error; // Lanzar el error
    } finally {
      setSigningUp(false);
    }
  };

  const signin = async (data: SigninData) => {
    setSigningIn(true);
    try {
      await signinService(data);
      // Después de un inicio de sesión exitoso, verificar la sesión para obtener los datos del usuario
      const authenticatedUser = await verifySessionService();
      setUser(authenticatedUser);
      showToast('Inicio de sesión exitoso.', 'success');
      return true; // Indica éxito
    } catch (error: unknown) {
      console.error('Error al iniciar sesión:', error);
      const errorMessage =
        error instanceof Error && error.message
          ? error.message
          : 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
      showToast(errorMessage, 'error');
      throw error; // Lanzar el error
    } finally {
      setSigningIn(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setRequestingPasswordReset(true);
    try {
      await forgotPasswordService(email);
      showToast('Se ha enviado un correo electrónico para restablecer tu contraseña.', 'success');
    } catch (error: unknown) {
      console.error('Error al solicitar el restablecimiento de contraseña:', error);
      const errorMessage =
        error instanceof Error && error.message
          ? error.message
          : 'Error al solicitar el restablecimiento de contraseña. Por favor, inténtalo de nuevo.';
      showToast(errorMessage, 'error');
      throw error; // Re-lanzar el error
    } finally {
      setRequestingPasswordReset(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signingIn,
        signingUp,
        requestingPasswordReset,
        signin,
        signup,
        signout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
