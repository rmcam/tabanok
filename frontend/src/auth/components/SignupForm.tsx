import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import useAuth from '../hooks/useAuth';
import { SignupData } from '../services/authService';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SignupFormProps {
  closeModal: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [firstLastName, setFirstLastName] = useState('');
  const [secondLastName, setSecondLastName] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { handleSignup } = useAuth(navigate);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEmailError(null);
    setPasswordError(null);

    if (!validateEmail(email)) {
      setEmailError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    const signupData: SignupData = {
      email: email,
      password: password,
      username: email,
      firstName: firstName,
      secondName: secondName,
      firstLastName: firstLastName,
      secondLastName: secondLastName,
    };
    const success = await handleSignup(signupData);
    if (success) {
      console.log('Registro exitoso');
      navigate('/');
      closeModal();
    } else {
      console.log('Error al registrarse');
      setError('Error al registrarse. Por favor, inténtalo de nuevo.');
    }
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
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
              {emailError && <p className="text-red-500">{emailError}</p>}
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
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="button" className="w-full" onClick={() => {
              if (!validateEmail(email)) {
                setEmailError('Por favor, ingresa un correo electrónico válido.');
                return;
              }

              if (password.length < 6) {
                setPasswordError('La contraseña debe tener al menos 6 caracteres.');
                return;
              }
              setStep(2);
            }}>
              Siguiente
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <div className="grid gap-2">
              <label
                htmlFor="firstName"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Primer Nombre
              </label>
              <Input
                type="text"
                id="firstName"
                placeholder="Ingresa tu primer nombre"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="secondName"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Segundo Nombre
              </label>
              <Input
                type="text"
                id="secondName"
                placeholder="Ingresa tu segundo nombre"
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="secondary" onClick={() => setStep(1)}>
                Atrás
              </Button>
              <Button type="button" className="w-1/2" onClick={() => setStep(3)}>
                Siguiente
              </Button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="grid gap-2">
              <label
                htmlFor="firstLastName"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Primer Apellido
              </label>
              <Input
                type="text"
                id="firstLastName"
                placeholder="Ingresa tu primer apellido"
                value={firstLastName}
                onChange={(e) => setFirstLastName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="secondLastName"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Segundo Apellido
              </label>
              <Input
                type="text"
                id="secondLastName"
                placeholder="Ingresa tu segundo apellido"
                value={secondLastName}
                onChange={(e) => setSecondLastName(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="secondary" onClick={() => setStep(2)}>
                Atrás
              </Button>
              <Button type="submit" className="w-1/2">
                Crear cuenta
              </Button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Crear una cuenta</CardTitle>
        <CardDescription>
          Completa todos los campos para crear una cuenta.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderStep()}
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
