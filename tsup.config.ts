import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src"],
  format: ["cjs", "esm"], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  splitting: false, // Split the code into multiple files
  sourcemap: true, // Generate source map
  clean: true, // Clean the dist folder before building
});