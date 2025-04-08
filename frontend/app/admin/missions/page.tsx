"use client";

import { useEffect, useState } from "react";

interface MissionTemplate {
  id: string;
  title: string;
  description: string;
  frequency: string;
  category?: string;
  tags?: string;
  conditions?: any;
  rewards?: any;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
}

export default function MissionTemplatesAdmin() {
  const [templates, setTemplates] = useState<MissionTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newTemplate, setNewTemplate] = useState<Partial<MissionTemplate>>({
    title: "",
    description: "",
    frequency: "diaria",
    isActive: true,
  });

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/v1/mission-templates");
      if (!res.ok) throw new Error("Error al obtener plantillas");
      const data = await res.json();
      setTemplates(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleCreate = async () => {
    try {
      const res = await fetch("/api/v1/mission-templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTemplate),
      });
      if (!res.ok) throw new Error("Error al crear plantilla");
      setNewTemplate({ title: "", description: "", frequency: "diaria", isActive: true });
      fetchTemplates();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar esta plantilla?")) return;
    try {
      const res = await fetch(`/api/v1/mission-templates/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar plantilla");
      fetchTemplates();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Administrar Plantillas de Misiones</h1>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">Crear nueva plantilla</h2>
        <input
          className="border p-2 mr-2"
          placeholder="Título"
          value={newTemplate.title}
          onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Descripción"
          value={newTemplate.description}
          onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
        />
        <select
          className="border p-2 mr-2"
          value={newTemplate.frequency}
          onChange={(e) => setNewTemplate({ ...newTemplate, frequency: e.target.value })}
        >
          <option value="diaria">Diaria</option>
          <option value="semanal">Semanal</option>
          <option value="mensual">Mensual</option>
          <option value="temporada">Temporada</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2" onClick={handleCreate}>
          Crear
        </button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Título</th>
              <th className="border px-2 py-1">Descripción</th>
              <th className="border px-2 py-1">Frecuencia</th>
              <th className="border px-2 py-1">Activo</th>
              <th className="border px-2 py-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((tpl) => (
              <tr key={tpl.id}>
                <td className="border px-2 py-1">{tpl.title}</td>
                <td className="border px-2 py-1">{tpl.description}</td>
                <td className="border px-2 py-1">{tpl.frequency}</td>
                <td className="border px-2 py-1">{tpl.isActive ? "Sí" : "No"}</td>
                <td className="border px-2 py-1">
                  {/* Para simplificar, solo eliminar. Se puede expandir con edición */}
                  <button
                    className="bg-red-500 text-white px-2 py-1 mr-2"
                    onClick={() => handleDelete(tpl.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
