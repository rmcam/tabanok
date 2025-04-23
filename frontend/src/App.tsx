import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom'; // Eliminar useNavigate
import { useAuth } from './auth/hooks/useAuth'; // Importar useAuth desde el hook
import PrivateRoute from './components/common/PrivateRoute';
import AuthenticatedLayout from './components/layout/AuthenticatedLayout'; // Importar el nuevo layout
// Importaciones dinámicas para code-splitting
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const TeacherDashboard = lazy(() => import('./components/dashboard/TeacherDashboard'));
import HomePage from './components/home/HomePage';
import { SidebarProvider } from './components/ui/sidebar';
// import { SidebarTrigger } from './components/ui/sidebar';

function App() {
  const { loading } = useAuth(); // Eliminar user y el argumento navigate

  // Mostrar un indicador de carga o null mientras se verifica la autenticación inicial
  if (loading) {
    return <div>Cargando autenticación...</div>; // O un spinner, etc.
  }

  return (
    <SidebarProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AuthenticatedLayout> {/* Usar el layout autenticado */}
                <Suspense fallback={<div>Cargando contenido...</div>}> {/* Mover Suspense aquí */}
                  <Dashboard />
                </Suspense>
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher-dashboard"
          element={
            <PrivateRoute>
              <AuthenticatedLayout> {/* Usar el layout autenticado */}
                <Suspense fallback={<div>Cargando contenido...</div>}> {/* Mover Suspense aquí */}
                  <TeacherDashboard />
                </Suspense>
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </SidebarProvider>
  );
}

export default App;
