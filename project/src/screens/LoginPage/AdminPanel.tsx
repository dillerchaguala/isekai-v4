import AdminAppointmentsList from "./AdminAppointmentsList";
import AdminUsersList from "./AdminUsersList";

export default function AdminPanel() {
  const user = localStorage.getItem("isekaiUser");
  const userData = user ? JSON.parse(user) : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <header className="w-full bg-purple-700 py-6 mb-8 shadow flex flex-col items-center">
        <h1 className="text-4xl text-white font-bold text-center">Panel de Administrador</h1>
        {userData && (
          <div className="text-white text-center mt-2">Bienvenido, {userData.name} ({userData.email})</div>
        )}
        <button
          className="mt-4 px-6 py-2 bg-white text-purple-700 rounded font-bold hover:bg-purple-100"
          onClick={() => window.location.href = "/"}
        >
          Volver al inicio
        </button>
      </header>
      <main className="w-full max-w-4xl mx-auto">
        <div className="mb-12">
          <AdminUsersList />
        </div>
        <AdminAppointmentsList />
      </main>
    </div>
  );
}
