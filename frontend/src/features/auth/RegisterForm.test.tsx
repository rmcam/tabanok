import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from './RegisterForm';

describe('RegisterForm', () => {
  it('debe renderizar el formulario de registro con email y contraseña', () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument();
  });

  it('debe permitir ingresar email y contraseña', async () => {
    render(<RegisterForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    await userEvent.type(emailInput, 'nuevo@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('nuevo@example.com');
    expect(passwordInput).toHaveValue('password123');
  });
});
