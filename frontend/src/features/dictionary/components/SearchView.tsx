import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRequireAuth } from '../../auth/useRequireAuth';
import { useSearch } from '../hooks/useSearch';
import { useAuth } from '../../auth/useAuth';

export function SearchView() {
  console.log("SearchView rendered");
  const { isAuthenticated } = useAuth();
  useRequireAuth();
  const [term, setTerm] = useState('');
  const { results, loading, error, search } = useSearch();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (term.trim() === '') return;
    if (isAuthenticated) {
      await search(term);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Buscar en el diccionario</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <label htmlFor="search-term" className="sr-only">
          Término a buscar
        </label>
        <input
          id="search-term"
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Escribe un término..."
          className="flex-1 border px-2 py-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
        <Button type="submit">Buscar</Button>
      </form>

      {loading && <p role="status">Cargando...</p>}
      {error && (
        <p role="status" className="text-red-500">
          {error}
        </p>
      )}

      <ul className="space-y-2" aria-live="polite">
        {results.map((item) => (
          <li key={item.id} className="border p-2 rounded hover:bg-gray-100 transition-colors">
            <h3 className="font-semibold">{item.entrada}</h3>
            <p>{item.definicion}</p>
            {item.ejemplos && item.ejemplos.length > 0 && (
              <div>
                <h4 className="font-semibold">Ejemplos:</h4>
                <ul>
                  {item.ejemplos.map((ejemplo, index) => (
                    <li key={index}>{ejemplo}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchView;
