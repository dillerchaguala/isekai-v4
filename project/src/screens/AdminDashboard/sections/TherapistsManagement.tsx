
import React, { useEffect, useState } from "react";
const API_BASE_URL = "http://localhost:4000/api";

const TherapistsManagement: React.FC = () => {
  const [therapists, setTherapists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/auth/users`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (!res.ok) throw new Error("No se pudo obtener la lista de usuarios");
        const data = await res.json();
        setTherapists(data.filter((u: any) => u.role === 'therapist'));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTherapists();
  }, []);

  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-4">Gestión de Terapeutas</h2>
      {loading ? (
        <p>Cargando terapeutas...</p>
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
              <th className="p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {therapists.map(therapist => (
              <tr key={therapist._id} className="border-b border-[#24506a]">
                <td className="p-2">{therapist.name}</td>
                <td className="p-2">{therapist.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TherapistsManagement;
