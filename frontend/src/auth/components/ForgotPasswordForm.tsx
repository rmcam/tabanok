import { Input } from '@/components/ui';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import useAuth, { AuthContextType } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

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
    await handleForgotPassword(email).then(() => {
      console.log("Email sent successfully");
    }).catch((error) => {
      console.error("Error sending email:", error);
      setError("Failed to send email. Please try again.");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center"> {/* Removed card styles */}
      {/* Removed duplicated title: <div className="text-2xl font-bold mb-6 text-gray-800">Recuperar Contraseña</div> */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6"> {/* Increased space-y, Adjusted max-width */}
        <div className="grid gap-3"> {/* Increased gap */}
          <Label htmlFor="email" className="text-sm text-gray-700"> {/* Adjusted text color */}
            Correo electrónico
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <Button type="submit" className="w-full rounded-lg py-2">
          Enviar enlace de restablecimiento
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
