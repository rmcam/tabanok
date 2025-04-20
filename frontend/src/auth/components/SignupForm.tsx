import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import useAuth from '../hooks/useAuth';
import { SignupData } from '../services/authService';
import Modal from '@/components/ui/Modal';

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { handleSignup } = useAuth(navigate);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const signupData: SignupData = {
      email: email,
      password: password,
      username: email,
      firstName: '',
      secondName: '',
      firstLastName: '',
      secondLastName: '',
    };
    const success = await handleSignup(signupData);
    if (success) {
      console.log('Registro exitoso');
      navigate('/');
    } else {
      console.log('Error al registrarse');
      setError('Error al registrarse. Por favor, inténtalo de nuevo.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
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
            <Button type="button" className="w-full" onClick={() => setStep(2)}>
              Siguiente
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <div>
              <h2>Información adicional</h2>
              <p>Por favor, proporciona información adicional para completar tu registro.</p>
            </div>
            <Button type="submit" className="w-full">
              Crear cuenta
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      title="Crear una cuenta"
      description="Ingresa tu correo electrónico y contraseña para crear una cuenta"
      trigger={<Button>Crear cuenta</Button>}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {renderStep()}
      </form>
    </Modal>
  );
};

export default SignupForm;
