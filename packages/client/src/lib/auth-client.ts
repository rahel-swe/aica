import { createAuthClient } from 'better-auth/client';

// Create auth instance
export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// For react hooks
// import { createAuth } from "better-auth";
