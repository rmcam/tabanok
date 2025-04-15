import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import { useRequireAuth } from '../../auth/useRequireAuth';
import { useEntry } from '../hooks/useEntry';

interface EntryDetailProps {
  entryId: string;
}

export function EntryDetail({ entryId }: EntryDetailProps) {
  useRequireAuth();
  const { entry, loading, error, fetchEntry } = useEntry();

  useEffect(() => {
    fetchEntry(entryId);
  }, [entryId, fetchEntry]);

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
