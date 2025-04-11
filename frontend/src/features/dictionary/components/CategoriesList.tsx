import { useCategories } from '../hooks/useCategories';
import { useRequireAuth } from '../../auth/hooks/useRequireAuth';
import { Button } from '@/components/ui/button';

export function CategoriesList() {
  useRequireAuth();
  const { categories, loading, error, refetch } = useCategories();

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Categorías</h2>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id} className="border p-2 rounded hover:bg-gray-100 transition-colors">
            {cat.name}
          </li>
        ))}
      </ul>
      <Button onClick={refetch} className="mt-4">
        Recargar
      </Button>
    </div>
  );
}

export default CategoriesList;
