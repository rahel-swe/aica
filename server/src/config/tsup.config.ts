import { defineConfig } from "tsup";

// TypeScript configuration for building the server application
export default defineConfig({
  entry: ["src/server.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  format: "esm",
});
