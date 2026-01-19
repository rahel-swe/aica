import { createAuthClient } from 'better-auth/react';

const { VITE_SERVER_BASE_URL } = import.meta.env;

export const authClient = createAuthClient({
  baseURL: VITE_SERVER_BASE_URL,
});
