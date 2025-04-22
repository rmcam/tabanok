import { Input } from '@/components/ui';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import useFormValidation from '@/hooks/useFormValidation';
import Loading from '@/components/common/Loading';

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const initialValues = {
    email: '',
    password: '',
    username: '',
    firstName: '',
    secondName: '',
    firstLastName: '',
    secondLastName: '',
  };

  const validationRules = {
    email: (value: string) => {
      if (!value) return 'Email es requerido';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email no es válido';
      return undefined;
    },
    password: (value: string) => {
      if (!value) return 'Contraseña es requerida';
      if (value.length < 6) return 'Contraseña debe tener al menos 6 caracteres';
      return undefined;
    },
    username: (value: string) => {
      if (!value) return 'Usuario es requerido';
      return undefined;
    },
    firstName: (value: string) => {
      if (!value) return 'Nombre es requerido';
      return undefined;
    },
    secondName: (value: string) => {
      if (!value) return 'Segundo nombre es requerido';
      return undefined;
    },
    firstLastName: (value: string) => {
      if (!value) return 'Apellido es requerido';
      return undefined;
    },
    secondLastName: (value: string) => {
      if (!value) return 'Segundo apellido es requerido';
      return undefined;
    },
  };

  const { values, errors, isValid, handleChange, handleSubmit } = useFormValidation(initialValues);

  const onSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    handleSubmit(validationRules)(e);
    if (isValid) {
      // Aquí puedes agregar la lógica para enviar los datos al backend
      console.log({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        secondName: values.secondName,
        firstLastName: values.firstLastName,
        secondLastName: values.secondLastName,
      });
    }
    setIsLoading(false);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-2xl font-bold mb-4">Registrarse</div>
      <form onSubmit={onSubmit} className="w-full max-w-xs space-y-4">
        {step === 1 && (
          <>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="w-full rounded-md"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-sm">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className="w-full rounded-md"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username" className="text-sm">
                Usuario
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                className="w-full rounded-md"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
            <Button type="button" onClick={nextStep} className="w-full rounded-md">
              Siguiente
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="grid gap-2">
              <Label htmlFor="firstName" className="text-sm">
                Nombre
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                className="w-full rounded-md"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="secondName" className="text-sm">
                Segundo Nombre
              </Label>
              <Input
                id="secondName"
                type="text"
                placeholder="Second Name"
                name="secondName"
                value={values.secondName}
                onChange={handleChange}
                className="w-full rounded-md"
              />
              {errors.secondName && <p className="text-red-500 text-sm">{errors.secondName}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="firstLastName" className="text-sm">
                Apellido
              </Label>
              <Input
                id="firstLastName"
                type="text"
                placeholder="First Last Name"
                name="firstLastName"
                value={values.firstLastName}
                onChange={handleChange}
                className="w-full rounded-md"
              />
              {errors.firstLastName && <p className="text-red-500 text-sm">{errors.firstLastName}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="secondLastName" className="text-sm">
                Segundo Apellido
              </Label>
              <Input
                id="secondLastName"
                type="text"
                placeholder="Second Last Name"
                name="secondLastName"
                value={values.secondLastName}
                onChange={handleChange}
                className="w-full rounded-md"
              />
              {errors.secondLastName && <p className="text-red-500 text-sm">{errors.secondLastName}</p>}
            </div>
            <Button type="button" onClick={prevStep} className="w-full rounded-md">
              Anterior
            </Button>
            <Button type="button" onClick={nextStep} className="w-full rounded-md">
              Siguiente
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <p>Confirme sus datos:</p>
              <p>Email: {values.email}</p>
              <p>Usuario: {values.username}</p>
              <p>Nombre: {values.firstName}</p>
              <p>Segundo Nombre: {values.secondName}</p>
              <p>Apellido: {values.firstLastName}</p>
              <p>Segundo Apellido: {values.secondLastName}</p>
            </div>
            <Button type="button" onClick={prevStep} className="w-full rounded-md">
              Anterior
            </Button>
            <Button type="submit" className="w-full rounded-md" disabled={!isValid || isLoading}>
              {isLoading ? <Loading /> : 'Registrarse'}
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
