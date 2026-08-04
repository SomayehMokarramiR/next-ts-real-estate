const API_URL = "/api/auth";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: User;
}

export interface MeResponse {
  success: boolean;
  user?: {
    _id: string;
    name: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
  };
  message?: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "خطایی رخ داده است");
  }

  return data;
}

export function login(data: { email: string; password: string }) {
  return apiRequest<LoginResponse>(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function register(data: {
  name: string;
  email: string;
  password: string;
}) {
  return apiRequest<RegisterResponse>(`${API_URL}/register`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getMe() {
  return apiRequest<MeResponse>(`${API_URL}/me`, {
    method: "GET",
  });
}

export function logout() {
  return apiRequest<LogoutResponse>(`${API_URL}/logout`, {
    method: "POST",
  });
}
