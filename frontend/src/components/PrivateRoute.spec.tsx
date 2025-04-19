import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { useAuth } from '../features/auth/useAuth';
import { vi } from 'vitest';

vi.mock('../features/auth/useAuth');

describe('PrivateRoute', () => {
  it('permite acceso a usuarios autenticados', () => {
    (vi.mocked(useAuth)).mockReturnValue({
      isAuthenticated: true,
      user: { id: '1', username: 'test', email: 'test@example.com', roles: [] },
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Contenido protegido</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.getByText(/Contenido protegido/i)).toBeInTheDocument();
  });

  it('deniega acceso a usuarios no autenticados', () => {
    (vi.mocked(useAuth)).mockReturnValue({
      isAuthenticated: false,
      user: null,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Contenido protegido</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText(/Contenido protegido/i)).not.toBeInTheDocument();
  });

  it('deniega acceso por rol insuficiente', () => {
    (vi.mocked(useAuth)).mockReturnValue({
      isAuthenticated: true,
      user: { id: '1', username: 'test', email: 'test@example.com', roles: ['user'] },
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <PrivateRoute requiredRoles={['admin']}>
          <div>Contenido protegido</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText(/Contenido protegido/i)).not.toBeInTheDocument();
  });

  it('muestra mensaje de sesión expirada si el token es inválido', () => {
    (vi.mocked(useAuth)).mockReturnValue({
      isAuthenticated: false,
      user: null,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      loading: false,
      error: 'Token inválido',
    });

    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Contenido protegido</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.getByText(/Token inválido/i)).toBeInTheDocument();
  });
});
