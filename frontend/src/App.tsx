import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './features/auth/LoginForm';
import SearchView from './features/dictionary/components/SearchView';
import EntryDetail from './features/dictionary/components/EntryDetail';
import CategoriesList from './features/dictionary/components/CategoriesList';
import VariationsList from './features/dictionary/components/VariationsList';
import SignupForm from './features/auth/SignupForm';
import PrivateRoute from './components/PrivateRoute';
import GamificationStats from './components/GamificationStats';
import { useAuth } from './features/auth/useAuth';
import { useState } from 'react';
import { Button } from './components/ui/button';
import Dashboard from './components/Dashboard';

function App() {
  const { logout, isAuthenticated } = useAuth();
  const [isLoading] = useState(false);
  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <BrowserRouter>
      <nav
        className="p-4 flex gap-4 bg-gray-100 mb-4"
        role="navigation"
        aria-label="Menú principal"
      >
        <Link to="/" className="transition-colors hover:bg-gray-100 rounded-md px-2 py-1">Inicio</Link>
        <Link to="/categories" className="transition-colors hover:bg-gray-100 rounded-md px-2 py-1">Categorías</Link>
        <Link to="/variations" className="transition-colors hover:bg-gray-100 rounded-md px-2 py-1">Variaciones</Link>
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="transition-colors hover:bg-gray-100 rounded-md px-2 py-1">Login</Link>
            <Link to="/signup" className="transition-colors hover:bg-gray-100 rounded-md px-2 py-1">Registrarse</Link>
          </>
        ) : (
          <Button onClick={handleLogout} variant="outline" size="sm">
            Cerrar sesión
          </Button>
        )}
      </nav>
      <main role="main" aria-label="Contenido principal" tabIndex={-1}>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><SearchView /></PrivateRoute>} />
<Route path="/entry/:id" element={<PrivateRoute><EntryDetailWrapper /></PrivateRoute>} />
          <Route path="/categories" element={<PrivateRoute requiredRole="admin"><CategoriesList /></PrivateRoute>} />
<Route path="/variations" element={<PrivateRoute><VariationsList /></PrivateRoute>} />
<Route path="/gamification" element={<PrivateRoute><GamificationStats userId="123" /></PrivateRoute>} />
        </Routes>
      </main>
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
