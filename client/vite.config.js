import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // اضافه کردن  @babylonjs/loaders/glTF به لیست
    include: ["@babylonjs/core", "@babylonjs/loaders/glTF"]
  }
});