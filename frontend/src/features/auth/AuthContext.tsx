import { createContext } from 'react';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  roles?: string[];
  token?: string; // Add token property to AuthUser interface
}

export interface AuthContextProps {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  firstLastName: string;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
