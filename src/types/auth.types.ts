export interface SessionUser {
  id: string;
  email: string;
}

export interface LoginRequest {
  email: string;
}

export interface AuthResponse {
  user: SessionUser;
}
