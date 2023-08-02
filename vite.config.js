// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // Add the 'assets' folder to include assets during build
  assetsInclude: ['/assets', /\.(gltf)$/i],
});
