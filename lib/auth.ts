"use client"

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("auth_token")
}

export function isAuthenticated(): boolean {
  return !!getAuthToken()
}

export function clearAuth(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("auth_token")
}
