import api from "./client";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  name: string;
  email: string;
  role: "STUDENT" | "ADMIN";
}

export async function registerUser(
  data: RegisterRequest
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    "/auth/register",
    data
  );

  return response.data;
}

export async function loginUser(
  data: LoginRequest
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    data
  );

  return response.data;
}