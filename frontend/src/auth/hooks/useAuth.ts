import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/authContext'; // Importar desde el nuevo archivo

export const useAuth = () => {
  const context = useContext<AuthContextType | undefined>(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
