import { defineConfig } from "tsup";

// TypeScript configuration for building the server application
export default defineConfig({
  entry: ["src/app.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  format: "esm",
});
