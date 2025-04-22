import ForgotPasswordForm from '@/auth/components/ForgotPasswordForm';
import SigninForm from '@/auth/components/SigninForm';
import SignupForm from '@/auth/components/SignupForm';
import React, { useEffect, useState } from 'react'; // Import useEffect
import Modal from './Modal';
import { Button } from '@/components/ui/button';

interface AuthModalsProps {
  defaultOpen?: 'signin' | 'signup' | 'forgotPassword';
  showDefaultTriggers?: boolean; // Add prop to control default triggers
  onModalClose?: () => void; // Add callback for when any modal closes
}

const AuthModals: React.FC<AuthModalsProps> = ({
  defaultOpen,
  showDefaultTriggers = true,
  onModalClose,
}) => {
  // Add onModalClose prop
  const [isSigninOpen, setIsSigninOpen] = useState(defaultOpen === 'signin');
  const [isSignupOpen, setIsSignupOpen] = useState(defaultOpen === 'signup');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(
    defaultOpen === 'forgotPassword',
  );

  // Add useEffect to handle changes in defaultOpen after initial render
  useEffect(() => {
    if (defaultOpen === 'signin') {
      setIsSigninOpen(true);
    } else if (defaultOpen === 'signup') {
      setIsSignupOpen(true);
    } else if (defaultOpen === 'forgotPassword') {
      setIsForgotPasswordOpen(true);
    }
    // Note: We might want to reset the other modals to closed here,
    // depending on the desired behavior when defaultOpen changes.
    // For now, it just opens the specified one.
  }, [defaultOpen]); // Re-run effect when defaultOpen changes

  // Helper function to handle modal closing and call the callback
  const handleOpenChange =
    (setter: React.Dispatch<React.SetStateAction<boolean>>, resetForm?: () => void) =>
    (open: boolean | undefined) => {
      setter(!!open); // Ensure boolean value
      if (!open) {
        if (onModalClose) {
          onModalClose();
        }
        if (resetForm) {
          resetForm();
        }
      }
    };

  return (
    <>
      <Modal
        isOpen={isSigninOpen}
        onOpenChange={handleOpenChange(setIsSigninOpen)} // Use helper
        title="Iniciar Sesión"
        description="Ingresa tus credenciales para acceder a tu cuenta." // Added description
        // Conditionally render trigger
        trigger={
          showDefaultTriggers ? (
            <Button variant="outline">Iniciar Sesión</Button>
          ) : undefined
        }
      >
        <SigninForm />
      </Modal>
      <Modal
        isOpen={isSignupOpen}
        onOpenChange={handleOpenChange(setIsSignupOpen)} // Use helper
        title="Registrarse"
        description="Crea una cuenta para empezar a usar la plataforma." // Added description
        // Conditionally render trigger
        trigger={
          showDefaultTriggers ? (
            <Button variant="outline">Registrarse</Button>
          ) : undefined
        }
      >
        <SignupForm />
      </Modal>

      <Modal
        isOpen={isForgotPasswordOpen}
        onOpenChange={handleOpenChange(setIsForgotPasswordOpen)} // Use helper
        title="Recuperar Contraseña"
        description="Ingresa tu correo electrónico para restablecer tu contraseña."
        // Conditionally render trigger
        trigger={
          showDefaultTriggers ? (
            <Button variant="outline">¿Olvidaste tu contraseña?</Button>
          ) : undefined
        }
      >
        {/* Pass the specific close handler for this modal */}
        <ForgotPasswordForm closeModal={() => handleOpenChange(setIsForgotPasswordOpen)(false)} />
      </Modal>
    </>
  );
};

export default AuthModals;
