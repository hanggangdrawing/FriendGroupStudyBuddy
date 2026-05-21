import { useEffect, useState } from "react";
import { findFriend } from "../data/seed";

const STORAGE_KEY = "hd.user";

export function getStoredUserId() {
  return localStorage.getItem(STORAGE_KEY);
}

export function clearStoredUser() {
  localStorage.removeItem(STORAGE_KEY);
}

// Reactive hook — returns the current friend object or null.
export function useUser() {
  const [userId, setUserId] = useState(getStoredUserId());

  useEffect(() => {
    const onStorage = () => setUserId(getStoredUserId());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return userId ? findFriend(userId) : null;
}
