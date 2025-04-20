import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import useAuth from '../hooks/useAuth';
import { SigninData } from '../types/authTypes';
import Modal from '@/components/ui/Modal';

const SigninForm: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { handleSignin } = useAuth(navigate);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const signinData: SigninData = { identifier: identifier, password };
    const success = await handleSignin(signinData);
    if (success) {
      console.log('Inicio de sesión exitoso');
      navigate('/');
    } else {
      console.log('Error al iniciar sesión');
      setError('Error al iniciar sesión. Credenciales inválidas.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      title="Iniciar Sesión"
      description="Ingresa tu correo electrónico y contraseña para iniciar sesión"
      trigger={<Button>Iniciar Sesión</Button>}
    >
      <div className="grid gap-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <label
              htmlFor="identifier"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Correo electrónico
            </label>
            <Input
              type="email"
              id="identifier"
              placeholder="Ingresa tu correo electrónico"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Contraseña
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full">
            Iniciar Sesión
          </Button>
        </form>
        <div className="text-center">
          <a href="/forgot-password" className="text-sm text-blue-500 hover:underline" onClick={(e) => {
            e.preventDefault();
            navigate('/forgot-password');
          }}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default SigninForm;
