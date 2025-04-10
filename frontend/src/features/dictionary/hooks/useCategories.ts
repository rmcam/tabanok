import { useState, useEffect } from 'react';
import api from '@/lib/api';

interface Category {
  id: string;
  name: string;
  // Agregar más campos según respuesta real del backend
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchCategories() {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Category[]>('/api/categories');
      setCategories(response.data);
    } catch (err) {
      console.error(err);
      setError('Error al obtener categorías');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, refetch: fetchCategories };
}
