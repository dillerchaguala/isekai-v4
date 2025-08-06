import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
const API_BASE_URL = "http://localhost:4000/api";

const TherapiesManagement: React.FC = () => {
  const [therapies, setTherapies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTherapies = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/therapies`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (!res.ok) throw new Error("No se pudo obtener la lista de terapias");
        const data = await res.json();
        setTherapies(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTherapies();
  }, []);

  // Crear terapia (ejemplo básico)
  const [showModal, setShowModal] = useState(false);
  const [newNombre, setNewNombre] = useState("");
  const [newDescripcion, setNewDescripcion] = useState("");
  const [newXp, setNewXp] = useState("");

  const handleCreate = () => setShowModal(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const xpNumber = Number(newXp);
    if (!newNombre.trim() || !newDescripcion.trim() || isNaN(xpNumber) || xpNumber <= 0) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/therapies`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: newNombre, description: newDescripcion, xp: xpNumber })
      });
      if (!res.ok) throw new Error("No se pudo crear la terapia");
      const nueva = await res.json();
      setTherapies([...therapies, nueva]);
      setShowModal(false);
      setNewNombre("");
      setNewDescripcion("");
      setNewXp("");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-4">Gestión de Terapias</h2>
      <Button className="mb-4 bg-purple-600 text-white" onClick={handleCreate}>Crear Nueva Terapia</Button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(15, 45, 52, 0.85)' }}>
          <div className="relative w-full max-w-lg mx-4 rounded-2xl shadow-2xl flex flex-col items-center justify-center" style={{ backgroundColor: '#0F2D34', top: '58%', transform: 'translateY(-20%)' }}>
            <div className="flex items-center justify-end p-6 border-b border-white/10 w-full">
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:bg-yellow-300/30 rounded-full p-1 transition-colors"
                aria-label="Cerrar"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Nueva Terapia</h2>
                <p className="text-white/70 text-sm">Agrega una nueva terapia al sistema</p>
              </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-2 text-center">{error}</div>}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Nombre de la terapia</label>
          <input
            type="text"
            value={newNombre}
            onChange={e => setNewNombre(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
            placeholder="Ejemplo: Terapia Cognitiva"
            required
          />
        </div>
        <div>
          <label className="block text-white text-sm font-medium mb-2">Descripción</label>
          <textarea
            value={newDescripcion}
            onChange={e => setNewDescripcion(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
            placeholder="Describe la terapia"
            required
          />
        </div>
        <div>
          <label className="block text-white text-sm font-medium mb-2">XP que otorga</label>
          <input
            type="number"
            min={1}
            value={newXp}
            onChange={e => setNewXp(e.target.value)}
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
        <p>Cargando terapias...</p>
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
            {therapies.map(therapy => (
              <tr key={therapy._id} className="border-b border-[#24506a]">
                <td className="p-2">{therapy.name}</td>
                <td className="p-2">
                  {/* Aquí puedes agregar más acciones como editar/eliminar */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TherapiesManagement;
