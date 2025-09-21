declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    PYTHON_AI_SERVER_URL: string;
    CLIENT_URL: string;
    AECJET_KEY: string;
  }
}
