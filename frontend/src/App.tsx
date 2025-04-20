import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import SigninForm from './auth/components/SigninForm';
import SignupForm from './auth/components/SignupForm';
import ForgotPasswordForm from './auth/components/ForgotPasswordForm';
import useAuth from './auth/hooks/useAuth';
import { Button } from './components/ui/button';
import React from 'react';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth(() => {});

  if (loading) {
    return <div>Cargando...</div>; // O un spinner
  }

  return user ? children : <Navigate to="/signin" />;
}

function App() {
  const navigate = useNavigate();
  const { user, handleSignout } = useAuth(navigate);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-100 py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">Mi Aplicación</h1>
      </header>
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/signin" element={<SigninForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div>
                  <p>Bienvenido, {user?.email}</p>
                  <Button onClick={handleSignout}>Cerrar sesión</Button>
                </div>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <footer className="bg-gray-100 py-2 px-6 text-center">
        <p>&copy; 2024 Mi Aplicación</p>
      </footer>
    </div>
  );
}

export default App;
