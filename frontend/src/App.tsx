import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import GamificationStats from './components/GamificationStats';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';
import ProfilePage from './components/ProfilePage';
import { Button } from './components/ui/button';
import { AuthContext } from './features/auth/AuthContext';
import { AuthProvider } from './features/auth/AuthProvider';
import LoginForm from './features/auth/LoginForm';
import RegisterForm from './features/auth/RegisterForm';
import CategoriesList from './features/dictionary/components/CategoriesList';
import EntryDetail from './features/dictionary/components/EntryDetail';
import SearchView from './features/dictionary/components/SearchView';
// import { useUnits } from './features/dashboard/useUnits'; // Eliminado: No usado (por ahora)
import VariationsList from './features/dictionary/components/VariationsList';
import StudentDashboard from './features/student/StudentDashboard';

function App() {
  const { isAuthenticated, loading, logout } = useContext(AuthContext);

  console.log("App - isAuthenticated:", isAuthenticated);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <nav
          className="p-4 flex gap-4 bg-gray-100 mb-4"
          role="navigation"
          aria-label="Menú principal"
        >
          <Link to="/" className="transition-colors hover:bg-gray-100 rounded-md px-2 py-1">
            Inicio
          </Link>
          <Link
            to="/categories"
            className="transition-colors hover:bg-gray-100 rounded-md px-2 py-1"
          >
            Categorías
          </Link>
          <Link
            to="/variations"
            className="transition-colors hover:bg-gray-100 rounded-md px 2 py-1"
          >
            Variaciones
          </Link>
          <Link to="/student" className="transition-colors hover:bg-gray-100 rounded-md px-2 py-1">
            Panel Estudiante
          </Link>
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="transition-colors hover:bg-gray-100 rounded-md px-2 py-1"
              >
                Ingresar
              </Link>
              <Link
                to="/signup"
                className="transition-colors hover:bg-gray-100 rounded-md px-2 py-1"
              >
                Registrarse
              </Link>
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
            <Route path="/signup" element={<RegisterForm />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <SearchView />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <PrivateRoute requiredRoles={['admin']}>
                  <CategoriesList />
                </PrivateRoute>
              }
            />
            <Route
              path="/entry/:id"
              element={
                <PrivateRoute>
                  <EntryDetailWrapper />
                </PrivateRoute>
              }
            />
            <Route
              path="/variations"
              element={
                <PrivateRoute>
                  <VariationsList />
                </PrivateRoute>
              }
            />
            <Route
              path="/gamification"
              element={
                <PrivateRoute>
                  <GamificationStats userId="123" />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/student"
              element={
                <PrivateRoute>
                  <StudentDashboard />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </AuthProvider>
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
function EntryDetailWrapper() {
  const { id } = useParams<{ id: string }>();
  if (!id) return <p>ID no válido</p>;
  return <EntryDetail entryId={id} />;
}

export default App;
