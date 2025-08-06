import React, { useEffect, useState } from "react";
const API_BASE_URL = "http://localhost:4000/api";

// Aquí podrías importar lógica de autenticación, API, etc.
// import { useAuth } from '../../../lib/AuthContext';
// import api from '../../../lib/api';


const AchievementsManagement: React.FC = () => {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado para crear logro
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [type, setType] = useState("");
  const [requirement, setRequirement] = useState("");
  const [rewardType, setRewardType] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  const [createError, setCreateError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/progress/achievements`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (!res.ok) throw new Error("No se pudo obtener la lista de logros");
        const data = await res.json();
        setAchievements(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  const handleCreate = () => {
    setShowModal(true);
    setCreateError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !icon.trim() || !type.trim() || !requirement.trim() || !rewardType.trim() || isNaN(Number(rewardAmount)) || Number(rewardAmount) <= 0) {
      setCreateError("Todos los campos son obligatorios y la recompensa debe ser un número mayor a 0");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/progress/achievements`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          description,
          icon,
          type,
          requirement,
          reward: { type: rewardType, amount: Number(rewardAmount) }
        })
      });
      if (!res.ok) throw new Error("No se pudo crear el logro");
      const nuevo = await res.json();
      setAchievements([...achievements, nuevo]);
      setShowModal(false);
      setTitle(""); setDescription(""); setIcon(""); setType(""); setRequirement(""); setRewardType(""); setRewardAmount("");
    } catch (err: any) {
      setCreateError(err.message);
    }
  };

  return (
    <div className="text-white w-full max-w-7xl mx-auto px-2 sm:px-4">
      <h2 className="text-xl font-bold mb-4">Gestión de Logros</h2>
      <button className="mb-4 bg-purple-600 text-white px-4 py-2 rounded" onClick={handleCreate}>Crear Nuevo Logro</button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-2 sm:px-0" style={{ backgroundColor: 'rgba(15, 45, 52, 0.85)' }}>
          <div className="absolute left-1/2 -translate-x-1/2 max-w-lg w-full mx-2 sm:mx-4 rounded-2xl shadow-2xl flex flex-col items-center justify-center" style={{ backgroundColor: '#0F2D34', top: '70%' }}>
            <div className="flex items-center justify-end p-6 border-b border-white/10 w-full">
              <button onClick={() => setShowModal(false)} className="text-white hover:bg-yellow-300/30 rounded-full p-1 transition-colors" aria-label="Cerrar">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Nuevo Logro</h2>
                <p className="text-white/70 text-sm">Agrega un nuevo logro al sistema</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {createError && <div className="bg-red-100 text-red-700 p-2 rounded mb-2 text-center">{createError}</div>}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Título</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent" placeholder="Ejemplo: Superación" required />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Descripción</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent" placeholder="Describe el logro" required />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Icono (URL)</label>
                  <input type="text" value={icon} onChange={e => setIcon(e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent" placeholder="URL del icono" required />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Tipo</label>
                  <input type="text" value={type} onChange={e => setType(e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent" placeholder="Ejemplo: Progreso" required />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Requisito</label>
                  <input type="text" value={requirement} onChange={e => setRequirement(e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent" placeholder="Ejemplo: Completar 5 actividades" required />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Tipo de recompensa</label>
                  <input type="text" value={rewardType} onChange={e => setRewardType(e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent" placeholder="Ejemplo: gemas" required />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Cantidad de recompensa</label>
                  <input type="number" min={1} value={rewardAmount} onChange={e => setRewardAmount(e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent" placeholder="Ejemplo: 10" required />
                </div>
                <button type="submit" className="w-full py-3 bg-yellow-300 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors">Guardar</button>
              </form>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <p className="text-center">Cargando logros...</p>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4 text-center">
          <strong>Error:</strong> {error}
          <br />
          Verifica que el backend esté corriendo y los endpoints respondan correctamente.
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full bg-[#183c4a] rounded-lg overflow-hidden text-xs sm:text-sm md:text-base">
            <thead>
              <tr className="bg-[#24506a] text-white">
                <th className="p-2 min-w-[60px]">Icono</th>
                <th className="p-2 min-w-[100px]">Título</th>
                <th className="p-2 min-w-[120px]">Descripción</th>
                <th className="p-2 min-w-[80px]">Tipo</th>
                <th className="p-2 min-w-[120px]">Requisito</th>
                <th className="p-2 min-w-[100px]">Recompensa</th>
                <th className="p-2 min-w-[80px]">Desbloqueado</th>
              </tr>
            </thead>
            <tbody>
              {achievements.map(achievement => (
                <tr key={achievement._id} className="border-b border-[#24506a] hover:bg-[#20425a] transition-colors">
                  <td className="p-2 text-center"><img src={achievement.icon} alt={achievement.title} className="w-8 h-8 mx-auto" /></td>
                  <td className="p-2 break-words">{achievement.title}</td>
                  <td className="p-2 break-words max-w-xs">{achievement.description}</td>
                  <td className="p-2 break-words">{achievement.type}</td>
                  <td className="p-2 break-words max-w-xs">{achievement.requirement}</td>
                  <td className="p-2 break-words">{achievement.reward?.type} ({achievement.reward?.amount})</td>
                  <td className="p-2">{achievement.isUnlocked ? "Sí" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AchievementsManagement;
