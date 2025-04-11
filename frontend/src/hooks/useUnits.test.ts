import { renderHook, act } from '@testing-library/react';
import useUnits from './useUnits';

describe('useUnits', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe retornar un array de unidades y un estado de carga', async () => {
    // Mock de fetch global
    const mockUnits = [
      { id: 1, name: 'Unidad 1' },
      { id: 2, name: 'Unidad 2' }
    ];
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockUnits
    }) as jest.Mock;
    global.fetch = fetchMock as unknown as typeof fetch;

    const { result } = renderHook(() => useUnits());

    // Estado inicial
    expect(result.current[0]).toEqual([]);
    expect(result.current[1]).toBe(true);

    // Esperar a que loading sea false (fetch completado)
    await act(async () => {
      await new Promise<void>((resolve) => {
        const check = () => {
          if (result.current[1] === false) resolve();
          else setTimeout(check, 10);
        };
        check();
      });
    });

    expect(result.current[0]).toEqual(mockUnits);
    expect(result.current[1]).toBe(false);
  });

  it('debe manejar errores de fetch', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: false,
      status: 500
    }) as jest.Mock;
    global.fetch = fetchMock as unknown as typeof fetch;

    const { result } = renderHook(() => useUnits());

    await act(async () => {
      await new Promise<void>((resolve) => {
        const check = () => {
          if (result.current[1] === false) resolve();
          else setTimeout(check, 10);
        };
        check();
      });
    });

    // Si hay error, las unidades siguen vacías y loading es false
    expect(result.current[0]).toEqual([]);
    expect(result.current[1]).toBe(false);
  });
});
