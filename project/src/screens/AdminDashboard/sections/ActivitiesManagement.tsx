import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
const API_BASE_URL = "http://localhost:4000/api";

// Aquí podrías importar lógica de autenticación, API, etc.
// import { useAuth } from '../../../lib/AuthContext';
// import api from '../../../lib/api';

const ActivitiesManagement: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newNombre, setNewNombre] = useState("");
  const [newDescripcion, setNewDescripcion] = useState("");
  const [newXp, setNewXp] = useState(0);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem("token");
        setCompletedIds([]); // Limpiar completados al cambiar de usuario
        const res = await fetch(`${API_BASE_URL}/activities`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (!res.ok) throw new Error("No se pudo obtener la lista de actividades");
        const data = await res.json();
        setActivities(data);
        // Obtener actividades completadas para el usuario actual
        const resCompleted = await fetch(`${API_BASE_URL}/activities/completed`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (resCompleted.ok) {
          const completed = await resCompleted.json();
          setCompletedIds(completed.map((c: any) => c.activityId));
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [localStorage.getItem('user')]);

  // Eliminar actividad/cita
  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta cita/actividad?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/activities/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) throw new Error("No se pudo eliminar la actividad");
      setActivities(activities.filter(a => a._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-4">Gestión de Actividades</h2>
      <Button className="mb-4 bg-purple-600 text-white" onClick={() => setShowModal(true)}>
        Crear Nueva Actividad
      </Button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(15, 45, 52, 0.8)' }}>
          <div className="relative w-full max-w-md mx-4 rounded-2xl shadow-2xl" style={{ backgroundColor: '#0F2D34' }}>
            <div className="flex items-center justify-end p-6 border-b border-white/10">
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:text-yellow-300 transition-colors"
                aria-label="Cerrar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Nueva Actividad</h2>
                <p className="text-white/70 text-sm">Agrega una nueva actividad al sistema</p>
              </div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!newNombre.trim() || !newDescripcion.trim() || newXp <= 0) return;
                  const token = localStorage.getItem("token");
                  try {
                    const res = await fetch(`${API_BASE_URL}/activities`, {
                      method: "POST",
                      headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({ nombre: newNombre, descripcion: newDescripcion, xp: newXp })
                    });
                    if (!res.ok) throw new Error("No se pudo crear la actividad");
                    const nueva = await res.json();
                    setActivities([...activities, nueva]);
                    setShowModal(false);
                    setNewNombre("");
                    setNewDescripcion("");
                    setNewXp(0);
                  } catch (err: any) {
                    alert(err.message);
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Nombre de la actividad</label>
                  <input
                    type="text"
                    value={newNombre}
                    onChange={e => setNewNombre(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                    placeholder="Ejemplo: Yoga grupal"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Descripción</label>
                  <textarea
                    value={newDescripcion}
                    onChange={e => setNewDescripcion(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                    placeholder="Describe la actividad"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">XP que otorga</label>
                  <input
                    type="number"
                    min={1}
                    value={newXp}
                    onChange={e => setNewXp(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                    placeholder="Ejemplo: 50"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-yellow-300 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Guardar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <p>Cargando actividades...</p>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          <strong>Error:</strong> {error}
          <br />
          Verifica que el backend esté corriendo y los endpoints respondan correctamente.
        </div>
      ) : (
        <table className="w-full bg-[#183c4a] rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#24506a] text-white">
              <th className="p-2">Nombre</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => (
              <tr key={activity._id} className="border-b border-[#24506a]">
                <td className="p-2">{activity.nombre}</td>
                <td className="p-2 flex gap-2">
                  <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-500/10" onClick={() => handleDelete(activity._id)}>
                    Eliminar
                  </Button>
                  {!completedIds.includes(activity._id) && (
                    <Button
                      variant="outline"
                      className="text-yellow-500 border-yellow-500 hover:bg-yellow-500/10"
                      onClick={async () => {
                        const token = localStorage.getItem("token");
                        try {
                          const res = await fetch(`${API_BASE_URL}/activities/${activity._id}/complete`, {
                            method: "POST",
                            headers: {
                              "Authorization": `Bearer ${token}`,
                              "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ xp: 50 })
                          });
                          if (!res.ok) {
                            const errData = await res.json();
                            alert(errData.message || "No se pudo completar la actividad");
                            return;
                          }
                          setCompletedIds([...completedIds, activity._id]);
                        } catch (err: any) {
                          alert(err.message);
                        }
                      }}
                    >
                      Completar
                    </Button>
                  )}
                  {completedIds.includes(activity._id) && (
                    <span className="px-2 py-1 rounded bg-green-600 text-white">¡Completado!</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ActivitiesManagement;

// Para actividades generales, ahora se usa /activities
// Para citas agendadas, usa el componente AppointmentsManagement y el endpoint /appointments/booked
