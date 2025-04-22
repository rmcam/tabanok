import { Input } from '@/components/ui';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import useFormValidation from '@/hooks/useFormValidation';
import Loading from '@/components/common/Loading';

const SigninForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    identifier: '',
    password: '',
  };

  const validationRules = {
    identifier: (value: string) => {
      if (!value) return 'Usuario es requerido';
      return undefined;
    },
    password: (value: string) => {
      if (!value) return 'Contraseña es requerida';
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
        identifier: values.identifier,
        password: values.password,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-2xl font-bold mb-4">Iniciar Sesión</div>
      <form onSubmit={onSubmit} className="w-full max-w-xs space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="identifier" className="text-sm">
            Usuario
          </Label>
          <Input
            id="identifier"
            type="text"
            placeholder="Email or Username"
            name="identifier"
            value={values.identifier}
            onChange={handleChange}
            className="w-full rounded-md"
          />
          {errors.identifier && <p className="text-red-500 text-sm">{errors.identifier}</p>}
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
        <Button type="submit" className="w-full rounded-md" disabled={!isValid || isLoading}>
          {isLoading ? <Loading /> : 'Iniciar Sesión'}
        </Button>
      </form>
    </div>
  );
};

export default SigninForm;
