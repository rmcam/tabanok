import { Button } from '@/components/ui/button';
import { useRequireAuth } from '../../auth/hooks/useRequireAuth';
import { useVariations } from '../hooks/useVariations';

export function VariationsList() {
  useRequireAuth();
  const { variations, loading, error, refetch } = useVariations();

  if (loading) return <p>Cargando variaciones...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Variaciones dialectales</h2>
      <ul className="space-y-2">
        {variations.map((v) => (
          <li key={v.id} className="border p-2 rounded hover:bg-gray-100 transition-colors">
            {v.name}
          </li>
        ))}
      </ul>
      <Button onClick={refetch} className="mt-4">
        Recargar
      </Button>
    </div>
  );
}

export default VariationsList;
