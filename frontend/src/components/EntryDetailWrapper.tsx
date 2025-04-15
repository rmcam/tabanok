import React from 'react';
import { useParams } from 'react-router-dom';
import EntryDetail from '@/features/dictionary/components/EntryDetail';

// Wrapper para pasar el param id a EntryDetail
function EntryDetailWrapper() {
  const { id } = useParams<{ id: string }>();
  if (!id) return <p>ID no válido</p>;
  return <EntryDetail entryId={id} />;
}

export default EntryDetailWrapper;
