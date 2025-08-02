import { useEffect, useState } from "react";

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("isekaiUser");
    const userId = user ? JSON.parse(user).id : null;
    if (!userId) {
      setError("Debes iniciar sesión para ver tus citas");
      setLoading(false);
      return;
    }
    fetch(`http://localhost:4000/api/appointment/${userId}`)
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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">Tus citas agendadas</h2>
      {appointments.length === 0 ? (
        <div className="text-gray-500">No tienes citas agendadas.</div>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt: any) => (
            <li key={appt._id} className="border-b pb-4">
              <div className="font-semibold">Fecha: {new Date(appt.date).toLocaleString()}</div>
              <div className="text-gray-700">Detalles: {appt.details}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
