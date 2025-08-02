// src/lib/api.ts
// Utilidad para conectar el frontend con el backend (registro, login, agendar cita)

const API_BASE_URL = "http://localhost:5000/api";

export async function registerUser(data: { name: string; email: string; password: string }) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function loginUser(data: { email: string; password: string }) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function createAppointment(data: { userId: string; date: string; description: string }) {
  const response = await fetch(`${API_BASE_URL}/appointment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
