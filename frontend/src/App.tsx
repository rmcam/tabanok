import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './features/auth/components/LoginForm';
import SearchView from './features/dictionary/components/SearchView';
import EntryDetail from './features/dictionary/components/EntryDetail';
import CategoriesList from './features/dictionary/components/CategoriesList';
import VariationsList from './features/dictionary/components/VariationsList';
import RegisterForm from './features/auth/RegisterForm';
import PrivateRoute from './components/PrivateRoute';
import GamificationStats from './components/GamificationStats';
import { useAuth } from './features/auth/hooks/useAuth';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Dashboard from './components/Dashboard';
import api from './lib/api';

function App() {
  const { logout, isAuthenticated, setIsAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      api.get('/auth/validate', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.data.isValid) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setIsAuthenticated(false);
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
        });
    }

    setIsLoading(false);
  }, [setIsAuthenticated, logout]);

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <BrowserRouter>
      <nav className="p-4 flex gap-4 bg-gray-100 mb-4">
        <Link to="/" className="transition-colors hover:bg-gray-100 rounded-md px-2 py-1">Inicio</Link>
        <Link to="/categories" className="transition-colors hover:bg-gray-100 rounded-md px-2 py-1">Categorías</Link>
        <Link to="/variations" className="transition-colors hover:bg-gray-100 rounded-md px-2 py-1">Variaciones</Link>
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="transition-colors hover:bg-gray-100 rounded-md px-2 py-1">Login</Link>
            <Link to="/register" className="transition-colors hover:bg-gray-100 rounded-md px-2 py-1">Registrarse</Link>
          </>
        ) : (
          <Button onClick={handleLogout} variant="outline" size="sm">
            Cerrar sesión
          </Button>
        )}
      </nav>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute><SearchView /></PrivateRoute>} />
        <Route path="/entry/:id" element={<EntryDetailWrapper />} />
        <Route path="/categories" element={<PrivateRoute requiredRole="admin"><CategoriesList /></PrivateRoute>} />
        <Route path="/variations" element={<VariationsList />} />
        <Route path="/gamification" element={<GamificationStats userId="123" />} />
      </Routes>
    </BrowserRouter>
  );
}

function Unauthorized() {
  return (
    <div>
      <h1>No autorizado</h1>
      <p>No tienes permiso para acceder a esta página.</p>
    </div>
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
