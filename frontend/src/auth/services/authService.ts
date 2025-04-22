import { SigninData, AuthResponse } from '../types/authTypes';

const API_URL = import.meta.env.VITE_API_URL; // Reemplazar con la URL real de tu backend

export interface SignupData {
  email: string;
  password: string;
  username: string;
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
}

// Función para registrar un nuevo usuario
export const signup = async (data: SignupData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        firstName: data.firstName,
        secondName: data.secondName,
        firstLastName: data.firstLastName,
        secondLastName: data.secondLastName,
        email: data.email,
        password: data.password,
        languages: null,
        preferences: null,
        role: 'user',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en el registro');
    }

    const authData: AuthResponse = await response.json();
    return authData;
  } catch (error) {
    throw new Error(error.message || 'Error en el registro');
  }
};

// Función para solicitar el restablecimiento de contraseña
export const forgotPassword = async (email: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al solicitar el restablecimiento de contraseña');
    }

    console.log('Correo electrónico de restablecimiento de contraseña enviado');
  } catch (error) {
    throw new Error(error.message || 'Error al solicitar el restablecimiento de contraseña');
  }
};

// Función para iniciar sesión
export const signin = async (data: SigninData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: data.identifier,
        password: data.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en el inicio de sesión');
    }

    const authData: AuthResponse = await response.json();
    return authData;
  } catch (error) {
    throw new Error(error.message || 'Error en el inicio de sesión');
  }
};

// Función para refrescar el token
export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al refrescar el token');
    }

    const authData: AuthResponse = await response.json();
    return authData;
  } catch (error) {
    throw new Error(error.message || 'Error al refrescar el token');
  }
};
