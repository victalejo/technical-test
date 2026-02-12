import type { AuthResponse } from "@/types/auth.types";

export function login(email: string): Promise<AuthResponse> {
  return fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  }).then((res) => {
    if (!res.ok) return res.json().then((e) => Promise.reject(e));
    return res.json();
  });
}

export function getMe(): Promise<AuthResponse> {
  return fetch("/api/auth/me").then((res) => {
    if (!res.ok) return res.json().then((e) => Promise.reject(e));
    return res.json();
  });
}

export function logout(): Promise<void> {
  return fetch("/api/auth/logout", { method: "POST" }).then((res) => {
    if (!res.ok) return res.json().then((e) => Promise.reject(e));
  });
}
