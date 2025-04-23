import Loading from '@/components/common/Loading';
import { Input } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import useFormValidation from '@/hooks/useFormValidation';
import React, { useEffect, useState } from 'react';
import { signup } from '@/auth/services/authService'; // Import the signup function

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null); // State for signup errors
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

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [secondNameError, setSecondNameError] = useState('');
  const [firstLastNameError, setFirstLastNameError] = useState('');
  const [secondLastNameError, setSecondLastNameError] = useState('');

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [secondNameTouched, setSecondNameTouched] = useState(false);
  const [firstLastNameTouched, setFirstLastNameTouched] = useState(false);
  const [secondLastNameTouched, setSecondLastNameTouched] = useState(false);

  const validationRules = React.useMemo(
    () => ({
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
    }),
    [],
  );

  const { values, isValid, handleChange, handleSubmit } = useFormValidation(initialValues);

  useEffect(() => {
    if (emailTouched) setEmailError(validationRules.email(values.email) || '');
    if (passwordTouched) setPasswordError(validationRules.password(values.password) || '');
    if (usernameTouched) setUsernameError(validationRules.username(values.username) || '');
    if (firstNameTouched) setFirstNameError(validationRules.firstName(values.firstName) || '');
    if (secondNameTouched) setSecondNameError(validationRules.secondName(values.secondName) || '');
    if (firstLastNameTouched)
      setFirstLastNameError(validationRules.firstLastName(values.firstLastName) || '');
    if (secondLastNameTouched)
      setSecondLastNameError(validationRules.secondLastName(values.secondLastName) || '');
  }, [
    values,
    emailTouched,
    passwordTouched,
    usernameTouched,
    firstNameTouched,
    secondNameTouched,
    firstLastNameTouched,
    secondLastNameTouched,
    validationRules,
  ]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);

    // Trigger validation for all fields
    handleSubmit(validationRules)(e);

    // Check isValid state after handleSubmit has potentially updated it
    // Note: isValid might not be immediately updated after handleSubmit in the same render cycle.
    // A more robust approach might involve checking errors directly or using a callback from handleSubmit
    // For now, we rely on the useEffect updating the error states and isValid
    if (isValid) {
      // Aquí puedes agregar la lógica para enviar los datos al backend
      console.log('Formulario válido, enviando datos:', {
        email: values.email,
        password: values.password,
        username: values.username,
        firstName: values.firstName,
        secondName: values.secondName,
        firstLastName: values.firstLastName,
        secondLastName: values.secondLastName,
      });
      try {
        console.log('Formulario válido, enviando datos:', {
          email: values.email,
          password: values.password,
          username: values.username,
          firstName: values.firstName,
          secondName: values.secondName,
          firstLastName: values.firstLastName,
          secondLastName: values.secondLastName,
        });
        // Call the signup service
        const response = await signup({
          email: values.email,
          password: values.password,
          username: values.username,
          firstName: values.firstName,
          secondName: values.secondName,
          firstLastName: values.firstLastName,
          secondLastName: values.secondLastName,
        });
        console.log('Registro exitoso:', response);
        // TODO: Handle successful signup (e.g., redirect, show success message)
      } catch (error) { // Removed ': any'
        console.error('Error durante el registro:', error);
        if (error instanceof Error) {
          setSignupError(error.message);
        } else {
          setSignupError('Ocurrió un error desconocido durante el registro.');
        }
      }
    } else {
      console.log('Errores de validación en el formulario final.');
      // Optionally, provide user feedback here that there are errors
    }
    setIsLoading(false);
  };

  const nextStep = () => {
    let currentStepFields: (keyof typeof initialValues)[] = [];
    let fieldsToTouch: React.Dispatch<React.SetStateAction<boolean>>[] = [];

    if (step === 1) {
      currentStepFields = ['email', 'password', 'username'];
      fieldsToTouch = [setEmailTouched, setPasswordTouched, setUsernameTouched];
    } else if (step === 2) {
      currentStepFields = ['firstName', 'firstLastName']; // Only required fields for step 2
      fieldsToTouch = [setFirstNameTouched, setFirstLastNameTouched];
    }

    // Mark fields as touched for the current step
    fieldsToTouch.forEach(setTouched => setTouched(true));

    // Manually validate fields for the current step
    let stepIsValid = true;
    currentStepFields.forEach(field => {
      const error = validationRules[field](values[field]);
      if (field === 'email') setEmailError(error || '');
      if (field === 'password') setPasswordError(error || '');
      if (field === 'username') setUsernameError(error || '');
      if (field === 'firstName') setFirstNameError(error || '');
      if (field === 'firstLastName') setFirstLastNameError(error || '');
      if (error) stepIsValid = false;
    });

    if (stepIsValid) {
      setStep(step + 1);
    } else {
      console.log(`Validation errors in step ${step}. Cannot proceed.`);
      // Optionally, provide user feedback here that there are errors
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center"> {/* Removed card styles */}
      {/* Removed duplicated title: <div className="text-2xl font-bold mb-8 text-gray-800">Registrarse</div> */}
      <div className="mb-4 text-center text-gray-700">
        Paso {step} de 3
      </div>
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-3">
        {step === 1 && (
          <>
            <div className="grid gap-1">
              <Label htmlFor="email" className="text-sm text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={() => setEmailTouched(true)}
                aria-invalid={!!emailError}
              />
              {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
            </div>
            <div className="grid gap-1">
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
                onBlur={() => setPasswordTouched(true)}
                aria-invalid={!!passwordError}
              />
              {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="username" className="text-sm text-gray-700">
                Usuario
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={() => setUsernameTouched(true)}
                aria-invalid={!!usernameError}
              />
              {usernameError && <p className="text-red-500 text-sm mt-2">{usernameError}</p>}
            </div>
            <Button type="button" onClick={nextStep} className="w-full rounded-lg py-2 mt-4">
              Siguiente
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="grid gap-1">
              <Label htmlFor="firstName" className="text-sm text-gray-700">
                Nombre
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={() => setFirstNameTouched(true)}
                aria-invalid={!!firstNameError}
              />
              {firstNameError && <p className="text-red-500 text-sm mt-2">{firstNameError}</p>}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="secondName" className="text-sm text-gray-700">
                Segundo Nombre
              </Label>
              <Input
                id="secondName"
                type="text"
                placeholder="Second Name"
                name="secondName"
                value={values.secondName}
                onChange={handleChange}
                onBlur={() => setSecondNameTouched(true)}
                aria-invalid={!!secondNameError}
              />
              {secondNameError && <p className="text-red-500 text-sm mt-2">{secondNameError}</p>}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="firstLastName" className="text-sm text-gray-700">
                Apellido
              </Label>
              <Input
                id="firstLastName"
                type="text"
                placeholder="First Last Name"
                name="firstLastName"
                value={values.firstLastName}
                onChange={handleChange}
                onBlur={() => setFirstLastNameTouched(true)}
                aria-invalid={!!firstLastNameError}
              />
              {firstLastNameError && <p className="text-red-500 text-sm mt-2">{firstLastNameError}</p>}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="secondLastName" className="text-sm text-gray-700">
                Segundo Apellido
              </Label>
              <Input
                id="secondLastName"
                type="text"
                placeholder="Second Last Name"
                name="secondLastName"
                value={values.secondLastName}
                onChange={handleChange}
                onBlur={() => setSecondLastNameTouched(true)}
                aria-invalid={!!secondLastNameError}
              />
              {secondLastNameError && <p className="text-red-500 text-sm mt-2">{secondLastNameError}</p>}
            </div>
            <Button type="button" onClick={prevStep} className="w-full rounded-lg py-2 mt-4">
              Anterior
            </Button>
            <Button type="button" onClick={nextStep} className="w-full rounded-lg py-2">
              Siguiente
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <div className="space-y-2 text-gray-700">
              <p className="font-semibold">Confirme sus datos:</p>
              <p>Email: {values.email}</p>
              <p>Usuario: {values.username}</p>
              <p>Nombre: {values.firstName}</p>
              <p>Segundo Nombre: {values.secondName}</p>
              <p>Apellido: {values.firstLastName}</p>
              <p>Segundo Apellido: {values.secondLastName}</p>
            </div>
            <Button type="button" onClick={prevStep} className="w-full rounded-lg py-2 mt-4">
              Anterior
            </Button>
            <Button type="submit" className="w-full rounded-lg py-2" disabled={!isValid || isLoading}>
              {isLoading ? <Loading /> : 'Registrarse'}
            </Button>
          </>
        )}

        {signupError && (
          <p className="text-red-500 text-sm mt-2 text-center">{signupError}</p>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
