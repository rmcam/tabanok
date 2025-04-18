import api from '@/lib/api';
import { useEffect, useState } from 'react';

type Lesson = object;

type Topic = object;

interface Category {
  id: string;
  title: string;
  description: string;
  order: number;
  isLocked: boolean;
  requiredPoints: number;
  isActive: boolean;
  unityId: string;
  unity: {
    id: string;
    title: string;
    description: string;
    order: number;
    isLocked: boolean;
    requiredPoints: number;
    isActive: boolean;
    userId: string;
    lessons: Lesson[];
    topics: Topic[];
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchCategories() {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Category[]>('/topics');
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
