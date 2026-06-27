import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { getClient } from '../database/db';

const client = await getClient();

export const auth = betterAuth({
  database: mongodbAdapter(client),
  secret: Bun.env.BETTER_AUTH_SECRET,
  trustedOrigins: [Bun.env.CLIENT_URL!],
  emailAndPassword: {
    enabled: true,
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
});
