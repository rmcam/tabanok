import { useEffect } from 'react';
import { useEntry } from '../hooks/useEntry';
import { useRequireAuth } from '../../auth/hooks/useRequireAuth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../../components/ui/card';

interface EntryDetailProps {
  entryId: string;
}

export function EntryDetail({ entryId }: EntryDetailProps) {
  useRequireAuth();
  const { entry, loading, error, fetchEntry } = useEntry();

  useEffect(() => {
    fetchEntry(entryId);
  }, [entryId]);

  if (loading) return <p>Cargando entrada...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!entry) return <p>No se encontró la entrada.</p>;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{entry.word}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{entry.definition}</p>
        {/* Agregar más campos según respuesta real */}
      </CardContent>
    </Card>
  );
}

export default EntryDetail;
