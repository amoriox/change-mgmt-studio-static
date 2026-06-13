const AUTH_KEY = "cms-static-auth";

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === "1";
}

export function login(password: string): boolean {
  const expected = import.meta.env.VITE_SITE_PASSWORD ?? "";
  if (!expected || password !== expected) return false;
  sessionStorage.setItem(AUTH_KEY, "1");
  return true;
}

export function logout(): void {
  sessionStorage.removeItem(AUTH_KEY);
}
