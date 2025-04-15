import { renderHook, waitFor } from '@testing-library/react';
import useUnits from './useUnits';
import { vi } from 'vitest';

vi.mock('../lib/api', () => {
  const mockUnits = [
    { id: '1', name: 'Unidad 1', description: 'Descripción 1' },
    { id: '2', name: 'Unidad 2', description: 'Descripción 2' },
  ];
  return {
    default: {
      get: vi.fn().mockResolvedValue({ data: mockUnits }),
    },
  };
});

describe('useUnits', () => {
  it('debe retornar un array de unidades y un estado de carga', async () => {
    const { result } = renderHook(() => useUnits());

    // Estado inicial
    expect(result.current.units).toEqual([]);
    expect(result.current.loading).toBe(true);

    // Esperar a que se resuelva la solicitud API y se actualice el estado
    await waitFor(() => expect(result.current.units).toEqual([
      { id: '1', name: 'Unidad 1', description: 'Descripción 1' },
      { id: '2', name: 'Unidad 2', description: 'Descripción 2' },
    ]));
    expect(result.current.loading).toBe(false);
  });

  it('debe manejar errores de fetch', async () => {
    vi.mock('../lib/api', () => {
      return {
        default: {
          get: vi.fn().mockRejectedValue(new Error('Fetch error')),
        },
      };
    });

    const { result } = renderHook(() => useUnits());

    // Estado inicial
    expect(result.current.units).toEqual([]);
    expect(result.current.loading).toBe(true);

    // Esperar a que se resuelva la solicitud API y se actualice el estado
    await waitFor(() => expect(result.current.units).toEqual([]));
    expect(result.current.loading).toBe(false);
  });
});
