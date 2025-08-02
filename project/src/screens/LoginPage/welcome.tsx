export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 to-yellow-100">
      <h1 className="text-5xl font-bold text-purple-700 mb-8">¡Bienvenido a ISEKAI!</h1>
      <p className="text-xl text-gray-700 mb-4">Has iniciado sesión correctamente.</p>
      <div className="mt-8 p-6 bg-white rounded shadow-lg">
        <span className="text-2xl font-semibold text-yellow-500">Tu viaje emocional comienza aquí 🚀</span>
      </div>
      <button
        className="mt-8 px-6 py-2 bg-purple-600 text-white rounded font-bold hover:bg-purple-700"
        onClick={() => window.location.href = "/"}
      >
        Volver al inicio
      </button>
    </div>
  );
}
