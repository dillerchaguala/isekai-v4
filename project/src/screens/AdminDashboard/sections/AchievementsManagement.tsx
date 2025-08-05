import React, { useEffect, useState } from "react";
const API_BASE_URL = "http://localhost:4000/api";

// Aquí podrías importar lógica de autenticación, API, etc.
// import { useAuth } from '../../../lib/AuthContext';
// import api from '../../../lib/api';

const AchievementsManagement: React.FC = () => {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-4">Gestión de Logros</h2>
      {loading ? (
        <p>Cargando logros...</p>
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
              <th className="p-2">Icono</th>
              <th className="p-2">Título</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Tipo</th>
              <th className="p-2">Requisito</th>
              <th className="p-2">Recompensa</th>
              <th className="p-2">Desbloqueado</th>
            </tr>
          </thead>
          <tbody>
            {achievements.map(achievement => (
              <tr key={achievement._id} className="border-b border-[#24506a]">
                <td className="p-2"><img src={achievement.icon} alt={achievement.title} className="w-8 h-8" /></td>
                <td className="p-2">{achievement.title}</td>
                <td className="p-2">{achievement.description}</td>
                <td className="p-2">{achievement.type}</td>
                <td className="p-2">{achievement.requirement}</td>
                <td className="p-2">{achievement.reward?.type} ({achievement.reward?.amount})</td>
                <td className="p-2">{achievement.isUnlocked ? "Sí" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AchievementsManagement;
