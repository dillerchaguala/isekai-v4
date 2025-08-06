import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
// Puedes ajustar la ruta si usas alias
const API_BASE_URL = "http://localhost:4000/api";

// Aquí podrías importar lógica de autenticación, API, etc.
// import { useAuth } from '../../../lib/AuthContext';
// import api from '../../../lib/api';

const UsersManagement: React.FC = () => {
  // ...existing code...
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener usuarios al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
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
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Eliminar usuario
  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/auth/users/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) throw new Error("No se pudo eliminar el usuario");
      setUsers(users.filter(u => u._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="text-white w-full max-w-7xl mx-auto px-2 sm:px-4">
      <h2 className="text-xl font-bold mb-4">Gestión de Usuarios</h2>
      {loading ? (
        <p className="text-center">Cargando usuarios...</p>
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
                <th className="p-2 min-w-[100px]">Nombre</th>
                <th className="p-2 min-w-[120px]">Email</th>
                <th className="p-2 min-w-[80px]">Rol</th>
                <th className="p-2 min-w-[100px]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-b border-[#24506a] hover:bg-[#20425a] transition-colors">
                  <td className="p-2 break-words">{user.name}</td>
                  <td className="p-2 break-words">{user.email}</td>
                  <td className="p-2 break-words">{user.role}</td>
                  <td className="p-2">
                    <button onClick={() => handleDelete(user._id)} className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
