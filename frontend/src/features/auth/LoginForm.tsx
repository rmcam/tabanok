import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export default function LoginForm() {
  console.log('LoginForm rendered');
  const { login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    try {
      await login(identifier, password);
      setSuccess(true);
    } catch (error: unknown) {
      setSuccess(false);
      if (error instanceof Error) {
        console.error('Login failed:', error.message);
      } else {
        console.error('Login failed: An unexpected error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">¡Sesión iniciada!</p>}
      <div className="mb-2">
        <label className="block mb-1">Usuario o correo institucional</label>
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          className="w-full border p-2 rounded"
          autoComplete="username"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-2 rounded"
          autoComplete="current-password"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>
    </form>
  );
}
