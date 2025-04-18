import { useState } from "react";
import { useAuth } from "./useAuth";

export default function RegisterForm() {
  console.log("RegisterForm rendered");
  const { register, loading, error } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    firstLastName: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      await register({
        username: form.username,
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        firstLastName: form.firstLastName,
      });
      setSuccess(true);
    } catch {
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Crear cuenta</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">¡Registro exitoso!</p>}
      <div className="mb-2">
        <label className="block mb-1">Primer Nombre</label>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Primer Apellido</label>
        <input
          type="text"
          name="firstLastName"
          value={form.firstLastName}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Nombre de usuario</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          autoComplete="new-password"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Confirmar contraseña</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          autoComplete="new-password"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
}
