import { signin } from '@/auth/services/authService';
import Loading from '@/components/common/Loading';
import { Button, Input, Label } from '@/components/ui';
import useFormValidation from '@/hooks/useFormValidation';
import React, { FormEvent, useCallback } from 'react';

interface SigninFormProps {
  identifier: string;
  password: string;
  [key: string]: string;
}

const SigninForm: React.FC = () => {
  const initialValues: SigninFormProps = {
    identifier: '',
    password: '',
  };

  const { values, errors, isValid, handleChange } =
    useFormValidation<SigninFormProps>(initialValues);

  const submitHandler = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const authData = await signin({
          identifier: values.identifier,
          password: values.password,
        });
        console.log('Inicio de sesión exitoso:', authData);
        // TODO: Guardar el token y redirigir al usuario
      } catch (error: unknown) {
        console.error('Error al iniciar sesión:', error);
        // TODO: Mostrar el error al usuario
      }
    },
    [values],
  );

  return (
    <div className="flex flex-col items-center justify-center"> {/* Removed card styles */}
      {/* Removed duplicated title: <div className="text-2xl font-bold mb-6 text-gray-800">Iniciar Sesión</div> */}
      {errors && <p className="text-red-500 mb-4">Error</p>} {/* Added margin */}
      <form onSubmit={submitHandler} className="w-full max-w-sm space-y-6"> {/* Increased space-y, Adjusted max-width */}
        <div className="grid gap-3"> {/* Increased gap */}
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
            className={`w-full rounded-lg border ${errors.identifier ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
            aria-label="Usuario"
          />
          {errors.identifier && <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password" className="text-sm text-gray-700">
            Contraseña
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className={`w-full rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
            aria-label="Contraseña"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          <div className="text-right text-sm mt-1">
            <a href="/forgot-password" className="text-blue-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
        <Button type="submit" className="w-full rounded-lg py-2" disabled={!isValid}>
          {isValid ? <Loading /> : 'Iniciar Sesión'}
        </Button>
      </form>
    </div>
  );
};

export default SigninForm;
