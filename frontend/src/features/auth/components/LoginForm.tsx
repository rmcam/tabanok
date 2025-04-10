import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../../../../components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '../../../../src/components/ui/alert';

export function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      console.error(err);
      setError('Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold">Iniciar sesión</h2>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        required
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Ingresando...' : 'Ingresar'}
      </Button>
    </form>
  );
}

export default LoginForm;
