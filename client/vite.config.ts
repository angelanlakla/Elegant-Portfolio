import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // 因为文件已经在 client 里面了，所以直接指向 src
      "@": path.resolve(import.meta.dirname, "src"), 
      "@shared": path.resolve(import.meta.dirname, "../shared"),
      "@assets": path.resolve(import.meta.dirname, "../attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname), // 当前目录就是 root
 build: {
    // 删掉之前的 path.resolve(...)，直接填 'dist'
    outDir: 'dist', 
    emptyOutDir: true,
  }
});
