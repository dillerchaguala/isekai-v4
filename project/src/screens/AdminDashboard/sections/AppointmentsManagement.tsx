import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
const API_BASE_URL = "http://localhost:4000/api";

const AppointmentsManagement: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        // Ajusta el endpoint según tu backend, por ejemplo /appointments/booked
        const res = await fetch(`${API_BASE_URL}/appointments/booked`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (!res.ok) throw new Error("No se pudo obtener la lista de citas agendadas");
        const data = await res.json();
        setAppointments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  // Eliminar cita agendada
  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta cita agendada?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/appointments/booked/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) throw new Error("No se pudo eliminar la cita agendada");
      setAppointments(appointments.filter(a => a._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-4">Citas Agendadas</h2>
      {loading ? (
        <p>Cargando citas agendadas...</p>
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
              <th className="p-2">Usuario</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Apellidos</th>
              <th className="p-2">Día</th>
              <th className="p-2">Hora</th>
              <th className="p-2">Sede</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment._id} className="border-b border-[#24506a]">
                <td className="p-2">{appointment.userId}</td>
                <td className="p-2">{appointment.nombre}</td>
                <td className="p-2">{appointment.apellidos}</td>
                <td className="p-2">{appointment.dia}</td>
                <td className="p-2">{appointment.hora}</td>
                <td className="p-2">{appointment.sede}</td>
                <td className="p-2">{appointment.estado}</td>
                <td className="p-2">
                  <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-500/10" onClick={() => handleDelete(appointment._id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentsManagement;
