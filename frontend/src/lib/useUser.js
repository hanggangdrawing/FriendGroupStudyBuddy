import { useEffect, useState } from "react";

const USER_KEY = "hd.user";
const TOKEN_KEY = "hd.token";

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
}

export function getStoredUserId() {
  return getStoredUser()?.id ?? null;
}

export function saveSession(token, user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function clearStoredUser() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

// Reactive hook — returns the signed-in user {id, name, role, color} or null.
export function useUser() {
  const [user, setUser] = useState(getStoredUser);

  useEffect(() => {
    const onStorage = () => setUser(getStoredUser());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return user;
}
