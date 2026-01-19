declare module 'bun' {
  interface Env {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    PYTHON_AI_SERVER_URL: string;
    CLIENT_URL: string;
    ARCJET_KEY: string;
    DB_NAME: string;
    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CLIENT_ID: string;
  }
}
