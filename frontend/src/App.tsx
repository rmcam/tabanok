import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './features/auth/components/LoginForm';
import SearchView from './features/dictionary/components/SearchView';
import EntryDetail from './features/dictionary/components/EntryDetail';
import CategoriesList from './features/dictionary/components/CategoriesList';
import VariationsList from './features/dictionary/components/VariationsList';
import RegisterForm from './features/auth/RegisterForm';

function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 flex gap-4 bg-gray-100 mb-4">
        <Link to="/" className="hover:underline">Inicio</Link>
        <Link to="/categories" className="hover:underline">Categorías</Link>
        <Link to="/variations" className="hover:underline">Variaciones</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Registrarse</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<SearchView />} />
        <Route path="/entry/:id" element={<EntryDetailWrapper />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/variations" element={<VariationsList />} />
      </Routes>
    </BrowserRouter>
  );
}

// Wrapper para pasar el param id a EntryDetail
import { useParams } from 'react-router-dom';
function EntryDetailWrapper() {
  const { id } = useParams<{ id: string }>();
  if (!id) return <p>ID no válido</p>;
  return <EntryDetail entryId={id} />;
}

export default App;
