declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MONGO_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    PYTHON_AI_SERVER_URL: string;
    CLIENT_URL: string;
  }
}
