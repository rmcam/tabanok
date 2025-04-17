import { renderHook, waitFor } from '@testing-library/react';
import useUnits from './useUnits';
import { vi } from 'vitest';
import api from '../lib/api';

const mockUnits = [
  { id: '1', name: 'Unit 1', description: 'Description 1' },
  { id: '2', name: 'Unit 2', description: 'Description 2' },
];

describe('useUnits', () => {
  it('should return an array of units and a loading state', async () => {
    const mockGet = vi.spyOn(api, 'get').mockResolvedValue({ data: mockUnits });

    const { result } = renderHook(() => useUnits());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.units).toEqual(mockUnits);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    expect(mockGet).toHaveBeenCalledWith('unity', { headers: {} });
  });

  it('should handle API errors and update the state', async () => {
    const mockError = new Error('API Error');
    const mockGet = vi.spyOn(api, 'get').mockRejectedValue(mockError);

    const { result } = renderHook(() => useUnits());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.units).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(mockError.message);
    });

    expect(mockGet).toHaveBeenCalledWith('unity', { headers: {} });
  });
});
