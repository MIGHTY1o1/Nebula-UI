// src/stores/auth.js
import { writable } from "svelte/store";

export const isAuthenticated = writable(false);
export const authToken = writable("");

export function setAuth(token) {
  isAuthenticated.set(true);
  authToken.set(token);
}

export function clearAuth() {
  isAuthenticated.set(false);
  authToken.set("");
}
