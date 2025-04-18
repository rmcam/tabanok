import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

// Mock the useAuth hook
jest.mock('../../features/auth/useAuth', () => ({
  useAuth: () => ({
    user: {
      username: 'testuser',
      token: 'testtoken',
    },
  }),
}));

describe('Dashboard', () => {
  it('renders the dashboard with welcome message', () => {
    render(<Dashboard />);
    const welcomeElement = screen.getByText(/Bienvenido, testuser!/i);
    expect(welcomeElement).toBeInTheDocument();
  });

  it('renders loading state', () => {
    jest.mock('./useUnits', () => ({
      useUnits: () => ({
        units: [],
        loading: true,
        error: null,
      }),
    }));
    render(<Dashboard />);
    const loadingElement = screen.getByText(/Cargando unidades.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  it('renders error state', () => {
    jest.mock('./useUnits', () => ({
      useUnits: () => ({
        units: [],
        loading: false,
        error: 'Error al cargar unidades',
      }),
    }));
    render(<Dashboard />);
    const errorElement = screen.getByText(/Error al cargar unidades/i);
    expect(errorElement).toBeInTheDocument();
  });

  it('renders units', () => {
    jest.mock('./useUnits', () => ({
      useUnits: () => ({
        units: [
          { id: 1, name: 'Unit 1', description: 'Description 1', progress: 50 },
          { id: 2, name: 'Unit 2', description: 'Description 2', progress: 75 },
        ],
        loading: false,
        error: null,
      }),
    }));
    render(<Dashboard />);
    const unit1Element = screen.getByText(/Unit 1/i);
    expect(unit1Element).toBeInTheDocument();
    const unit2Element = screen.getByText(/Unit 2/i);
    expect(unit2Element).toBeInTheDocument();
  });
});
