import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import AdminMissionsPanel from './AdminMissionsPanel';
import { vi } from 'vitest';

describe('AdminMissionsPanel', () => {
  it('debe renderizar el panel de administración de misiones', async () => {
    // Mockear la llamada a fetch para simular la respuesta de la API
    const mockFetch = vi.fn();
    global.fetch = mockFetch;
    mockFetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue([
        {
          id: '1',
          title: 'Misión 1',
          description: 'Descripción de la misión 1',
          frequency: 'diaria',
          categories: ['categoria1'],
          active: true,
          startDate: '2023-01-01',
          endDate: '2023-12-31',
        },
      ]),
      ok: true,
    });

    render(<AdminMissionsPanel />);

    // Esperar a que se cargue la tabla de misiones
    await waitFor(() => expect(screen.getAllByText(/Misión 1/i)[0]).toBeInTheDocument());
    expect(screen.getByText(/Descripción de la misión 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Crear nueva misión/i)).toBeInTheDocument();

    // Clic en el botón para mostrar el formulario de creación de misiones
    fireEvent.click(screen.getByText(/Crear nueva misión/i));

    // Esperar a que el formulario de creación de misiones sea renderizado
    await waitFor(() => expect(screen.getByText(/Guardar misión/i)).toBeInTheDocument());
  });
});
