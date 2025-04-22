import { Input } from '@/components/ui';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth, { AuthContextType } from '../hooks/useAuth';

interface ForgotPasswordFormProps {
  closeModal: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { handleForgotPassword } = useAuth(navigate) as AuthContextType;
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError('Por favor, ingresa tu correo electrónico.');
      return;
    }
    await handleForgotPassword(email);
    navigate('/signin');
    closeModal();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-2xl font-bold mb-4">Recuperar Contraseña</div>
      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-sm">
            Correo electrónico
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="w-full rounded-md">
          Enviar enlace de restablecimiento
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
