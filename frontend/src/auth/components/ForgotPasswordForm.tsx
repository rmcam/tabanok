import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import useAuth from '../hooks/useAuth';
import { AuthContextType } from '../hooks/useAuth';

const ForgotPasswordForm: React.FC = () => {
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
  };

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Recuperar Contraseña</CardTitle>
          <CardDescription className="text-muted-foreground text-center">
            Ingresa tu correo electrónico para recibir un enlace para restablecer tu contraseña.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Correo electrónico
              </label>
              <Input
                type="email"
                id="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Enviar enlace de restablecimiento
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
