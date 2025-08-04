// src/lib/api.ts
const API_BASE_URL = "http://localhost:5000/api";

// Función auxiliar para hacer peticiones autenticadas
async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Sesión expirada');
  }

  return response;
}

export async function registerUser(data: { name: string; email: string; password: string }) {
  const response = await authenticatedFetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function loginUser(data: { email: string; password: string }) {
  const response = await authenticatedFetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function createAppointment(data: { userId: string; date: string; description: string }) {
  const response = await authenticatedFetch(`${API_BASE_URL}/appointment`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}

// Nueva función para verificar si el token es válido
export async function validateToken() {
  try {
    const response = await authenticatedFetch(`${API_BASE_URL}/auth/validate`);
    return response.ok;
  } catch {
    return false;
  }
}
