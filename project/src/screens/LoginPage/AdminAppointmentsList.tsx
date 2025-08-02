import { useEffect, useState } from "react";

export default function AdminAppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Aquí podrías agregar lógica para verificar si el usuario es admin
    fetch("http://localhost:4000/api/appointment/all")
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar citas");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">Cargando citas...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">Citas agendadas (Administrador)</h2>
      {appointments.length === 0 ? (
        <div className="text-gray-500">No hay citas agendadas.</div>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt: any) => (
            <li key={appt._id} className="border-b pb-4">
              <div className="font-semibold">Fecha: {new Date(appt.date).toLocaleString()}</div>
              <div className="text-gray-700">Detalles: {appt.details}</div>
              <div className="text-gray-500 text-sm">Usuario: {appt.user}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
