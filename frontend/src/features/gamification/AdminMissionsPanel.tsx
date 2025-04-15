import React, { useEffect, useState } from 'react';

interface Mission {
  id: string;
  title: string;
  description: string;
  frequency: 'diaria' | 'semanal' | 'mensual' | 'temporada' | 'contribucion';
  categories: string[];
  active: boolean;
  startDate: string;
  endDate: string;
}

const AdminMissionsPanel: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [newMission, setNewMission] = useState<Partial<Mission>>({
    title: '',
    description: '',
    frequency: 'diaria' as Mission['frequency'],
    categories: [],
    active: true,
    startDate: '',
    endDate: '',
  });
  const [editingMission, setEditingMission] = useState<Mission | null>(null);

  const fetchMissions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/gamification/mission-templates');
      if (!response.ok) throw new Error('Error al obtener misiones');
      const data = await response.json();
      setMissions(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMissionStatus = async (missionId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/v1/gamification/mission-templates/${missionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentStatus }),
      });
      if (!response.ok) throw new Error('Error al actualizar estado');
      fetchMissions();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido');
      }
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  if (loading) return <p>Cargando misiones...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Panel de Misiones Gamificadas</h2>
      <button
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => {
          setShowCreateForm(!showCreateForm);
          setEditingMission(null);
          setNewMission({
            title: '',
            description: '',
            frequency: 'diaria',
            categories: [],
            active: true,
            startDate: '',
            endDate: '',
          });
        }}
      >
        {showCreateForm ? 'Cancelar' : 'Crear nueva misión'}
      </button>

      {(showCreateForm || editingMission) && (
        <form
          className="mb-4 p-4 border rounded bg-gray-50"
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            try {
              const url = editingMission
                ? `/api/v1/gamification/missions/${editingMission.id}`
                : '/api/v1/gamification/missions';
              const method = editingMission ? 'PATCH' : 'POST';
              const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMission),
              });
              if (!response.ok) throw new Error(editingMission ? 'Error al actualizar misión' : 'Error al crear misión');
              setShowCreateForm(false);
              setEditingMission(null);
              setNewMission({
                title: '',
                description: '',
                frequency: 'diaria',
                categories: [],
                active: true,
                startDate: '',
                endDate: '',
              });
              fetchMissions();
            } catch (err: unknown) {
              if (err instanceof Error) {
                setError(err.message);
              } else {
                setError('Error desconocido');
              }
            }
          }}
        >
          <h3 className="font-semibold mb-2">{editingMission ? 'Editar Misión' : 'Nueva Misión'}</h3>
          <div className="mb-2">
            <label className="block mb-1">Título</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={newMission.title}
              onChange={(e) => setNewMission({ ...newMission, title: e.target.value })}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Descripción</label>
            <textarea
              className="w-full border p-2 rounded"
              value={newMission.description}
              onChange={(e) => setNewMission({ ...newMission, description: e.target.value })}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Frecuencia</label>
            <select
              className="w-full border p-2 rounded"
              value={newMission.frequency}
              onChange={(e) => setNewMission({ ...newMission, frequency: e.target.value })}
            >
              <option value="diaria">Diaria</option>
              <option value="semanal">Semanal</option>
              <option value="mensual">Mensual</option>
              <option value="temporada">Temporada</option>
              <option value="contribucion">Contribución</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1">Categorías (separadas por coma)</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={newMission.categories?.join(', ') || ''}
              onChange={(e) =>
                setNewMission({
                  ...newMission,
                  categories: e.target.value.split(',').map((c) => c.trim()),
                })
              }
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Fecha de inicio</label>
            <input
              type="date"
              className="w-full border p-2 rounded"
              value={newMission.startDate}
              onChange={(e) => setNewMission({ ...newMission, startDate: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Fecha de fin</label>
            <input
              type="date"
              className="w-full border p-2 rounded"
              value={newMission.endDate}
              onChange={(e) => setNewMission({ ...newMission, endDate: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Estado</label>
            <select
              className="w-full border p-2 rounded"
              value={newMission.active ? 'activa' : 'inactiva'}
              onChange={(e) =>
                setNewMission({ ...newMission, active: e.target.value === 'activa' })
              }
            >
              <option value="activa">Activa</option>
              <option value="inactiva">Inactiva</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Guardar misión
          </button>
        </form>
      )}
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Título</th>
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Frecuencia</th>
            <th className="p-2 border">Categorías</th>
            <th className="p-2 border">Estado</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr key={mission.id} className="border-b">
              <td className="p-2 border">{mission.title}</td>
              <td className="p-2 border">{mission.description}</td>
              <td className="p-2 border">
                {mission.frequency === 'contribucion' ? 'Contribución' : mission.frequency}
              </td>
              <td className="p-2 border">{mission.categories.join(', ')}</td>
              <td className="p-2 border">{mission.active ? 'Activa' : 'Inactiva'}</td>
              <td className="p-2 border">
                <button
                  className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                  onClick={() => {
                    setEditingMission(mission);
                    setShowCreateForm(false);
                    setNewMission({
                      title: mission.title,
                      description: mission.description,
                      frequency: mission.frequency,
                      categories: mission.categories,
                      active: mission.active,
                      startDate: mission.startDate,
                      endDate: mission.endDate,
                    });
                  }}
                >
                  Editar
                </button>
                <button
                  className={`px-2 py-1 rounded text-white ${mission.active ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                  onClick={() => toggleMissionStatus(mission.id, mission.active)}
                >
                  {mission.active ? 'Desactivar' : 'Activar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMissionsPanel;
