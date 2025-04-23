import { createContext } from 'react';
import { SigninData, SignupData, User } from '../types/authTypes';

export interface AuthContextType {
  user: User | null;
  loading: boolean; // Estado de carga inicial (verificación de autenticación)
  signingIn: boolean; // Estado de carga para signin
  signingUp: boolean; // Estado de carga para signup
  requestingPasswordReset: boolean; // Estado de carga para forgotPassword
  signin: (data: SigninData) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  signout: () => void;
  forgotPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
