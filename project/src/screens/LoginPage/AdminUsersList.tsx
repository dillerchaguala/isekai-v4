import { useEffect, useState } from "react";

export default function AdminUsersList() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/auth/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar usuarios");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">Cargando usuarios...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">Usuarios registrados</h2>
      {users.length === 0 ? (
        <div className="text-gray-500">No hay usuarios registrados.</div>
      ) : (
        <ul className="space-y-4">
          {users.map((user: any) => (
            <li key={user._id} className="border-b pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <div className="font-semibold">Nombre: {user.name}</div>
                <div className="text-gray-700">Email: {user.email}</div>
                <div className="text-gray-500 text-sm">Rol: {user.role}</div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={async () => {
                    if (window.confirm('¿Seguro que deseas eliminar este usuario?')) {
                      await fetch(`http://localhost:4000/api/auth/users/${user._id}`, { method: 'DELETE' });
                      setUsers(users.filter(u => u._id !== user._id));
                    }
                  }}
                >Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
