import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { getClient } from '../database/db';
import ENV from '../config/env.config';

const client = await getClient();

export const auth = betterAuth({
  database: mongodbAdapter(client),
  secret: ENV.BETTER_AUTH_SECRET,
  trustedOrigins: [ENV.CLIENT_URL],
  emailAndPassword: {
    enabled: true,
  },
});
