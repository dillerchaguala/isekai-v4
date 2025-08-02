import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../lib/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await loginUser({ email, password });
      if (res.token) {
        // Guardar usuario y token en localStorage
        localStorage.setItem("isekaiUser", JSON.stringify(res.user));
        localStorage.setItem("isekaiToken", res.token);
        // Redirigir según el rol
        if (res.user.role === "admin") {
          navigate("/administrador");
        } else {
          navigate("/welcome");
        }
      } else {
        setError(res.message || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded font-bold"
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </form>
    </div>
  );
}
