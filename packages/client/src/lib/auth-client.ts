import { createAuthClient } from 'better-auth/client';

export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api,'
});

export { useSession } from 'better-auth/react';

