import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { useAuth } from '../features/auth/useAuth';
import { vi } from 'vitest';

vi.mock('../features/auth/useAuth');

describe('PrivateRoute', () => {
  const mockedUseAuth = useAuth as jest.Mock;

  it('should redirect to /login if user is not authenticated', () => {
    mockedUseAuth.mockReturnValue({
      isAuthenticated: false,
      loading: false,
      user: null,
    });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<PrivateRoute><div>Protected Content</div></PrivateRoute>} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('should render the children if user is authenticated', () => {
    mockedUseAuth.mockReturnValue({
      isAuthenticated: true,
      loading: false,
      user: { role: 'user' },
    });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<PrivateRoute><div>Protected Content</div></PrivateRoute>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should redirect to /unauthorized if user is authenticated but does not have the required role', () => {
    mockedUseAuth.mockReturnValue({
      isAuthenticated: true,
      loading: false,
      user: { role: 'user' },
    });

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/admin" element={<PrivateRoute requiredRoles={['admin']}><div>Admin Content</div></PrivateRoute>} />
          <Route path="/unauthorized" element={<div>Unauthorized Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Unauthorized Page')).toBeInTheDocument();
  });

  it('should render the children if user is authenticated and has the required role', () => {
    mockedUseAuth.mockReturnValue({
      isAuthenticated: true,
      loading: false,
      user: { role: 'admin' },
    });

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/admin" element={<PrivateRoute requiredRoles={['admin']}><div>Admin Content</div></PrivateRoute>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Admin Content')).toBeInTheDocument();
  });

  it('should display loading indicator while authenticating', () => {
    mockedUseAuth.mockReturnValue({
      isAuthenticated: false,
      loading: true,
      user: null,
    });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<PrivateRoute><div>Protected Content</div></PrivateRoute>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });
});
