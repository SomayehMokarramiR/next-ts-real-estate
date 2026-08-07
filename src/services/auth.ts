const API_URL = "/api/auth";

/* =========================
   Types
========================= */

export interface User {
  id: string;
  name: string;
  email: string;
  role?: "admin" | "user";
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  tempUserId?: string | number;
}

export interface VerifyEmailResponse {
  success?: boolean;
  message: string;
}

export interface CompleteRegistrationResponse {
  success: boolean;
  message: string;
  user?: User;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface VerifyResetCodeResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface MeResponse {
  success: boolean;

  user?: {
    _id: string;
    name: string;
    lastName?: string;
    email: string;
    phoneNumber?: string;
    role?: "admin" | "user";
    createdAt?: string;
    updatedAt?: string;
  };

  message?: string;
}
export interface LogoutResponse {
  success: boolean;
  message: string;
}

/* =========================
   API Request
========================= */

async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const responseText = await response.text();

  console.log("API URL:", url);
  console.log("API STATUS:", response.status);
  console.log("API RAW RESPONSE:", responseText);

  let data: T;

  try {
    data = JSON.parse(responseText);
  } catch {
    console.error("API RESPONSE IS NOT JSON:", responseText);

    throw new Error(`پاسخ API معتبر نیست. Status: ${response.status}`);
  }

  console.log("API DATA:", data);

  if (!response.ok) {
    const errorData = data as T & {
      message?: string;
    };

    throw new Error(errorData?.message || "خطایی رخ داده است");
  }

  return data;
}

/* =========================
   Login
========================= */

export function login(data: { email: string; password: string }) {
  return apiRequest<LoginResponse>(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* =========================
   Register - Step 1
========================= */

export function register(data: { email: string }) {
  return apiRequest<RegisterResponse>(`${API_URL}/register`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* =========================
   Verify Email - Step 2
========================= */

export function verifyEmail(data: {
  tempUserId: string | number;
  verificationCode: string;
}) {
  return apiRequest<VerifyEmailResponse>(`${API_URL}/verify-email`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* =========================
   Complete Registration - Step 3
========================= */

export function completeRegistration(data: {
  userId: string | number;
  password: string;
  phoneNumber: string;
}) {
  return apiRequest<CompleteRegistrationResponse>(
    `${API_URL}/complete-registration`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

/* =========================
   Get Current User
========================= */

export function getMe() {
  return apiRequest<MeResponse>(`${API_URL}/me`, {
    method: "GET",
  });
}

/* =========================
   Logout
========================= */

export function logout() {
  return apiRequest<LogoutResponse>(`${API_URL}/logout`, {
    method: "POST",
  });
}
/* =========================
   Forgot Password - Step 1
========================= */

export function forgotPassword(data: { email: string }) {
  return apiRequest<ForgotPasswordResponse>(`${API_URL}/forgot-password`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* =========================
   Verify Reset Code - Step 2
========================= */

export function verifyResetCode(data: { email: string; code: string }) {
  return apiRequest<VerifyResetCodeResponse>(`${API_URL}/verify-reset-code`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* =========================
   Reset Password - Step 3
========================= */

export function resetPassword(data: { email: string; password: string }) {
  return apiRequest<ResetPasswordResponse>(`${API_URL}/reset-password`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
