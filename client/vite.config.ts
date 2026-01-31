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
    // 强制将打包产物输出到 client 文件夹同级的 dist 文件夹中
    outDir: path.resolve(import.meta.dirname, "../dist"), 
    emptyOutDir: true,
  }
});
