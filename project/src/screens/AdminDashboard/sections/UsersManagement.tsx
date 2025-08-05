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
    <div className="text-white">
      <h2 className="text-xl font-bold mb-4">Gestión de Usuarios</h2>
      {loading ? (
        <p>Cargando usuarios...</p>
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
              <th className="p-2">Rol</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b border-[#24506a]">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded ${user.role === 'admin' ? 'bg-purple-600' : user.role === 'therapist' ? 'bg-green-600' : 'bg-blue-600'} text-white`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-2 flex gap-2">
                  <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-500/10" onClick={() => handleDelete(user._id)}>
                    Eliminar
                  </Button>
                  {user.role !== 'therapist' && (
                    <Button variant="outline" className="text-green-500 border-green-500 hover:bg-green-500/10" onClick={async () => {
                      const token = localStorage.getItem('token');
                      const res = await fetch(`${API_BASE_URL}/auth/users/${user._id}/role`, {
                        method: 'PATCH',
                        headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ role: 'therapist' })
                      });
                      if (res.ok) {
                        setUsers(users.map(u => u._id === user._id ? { ...u, role: 'therapist' } : u));
                      } else {
                        alert('No se pudo asignar el rol de terapeuta');
                      }
                    }}>
                      Asignar Terapeuta
                    </Button>
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

export default UsersManagement;
