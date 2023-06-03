import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import packageJson from "./package.json";
import makeManifest from "./manifest";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const isExt = env.mode === "extension";

  return {
    server: {
      port: 3000,
    },

    plugins: [react(), isExt ? makeManifest(packageJson.version) : null].filter(
      Boolean
    ),

    build: {
      rollupOptions: isExt
        ? {
            input: {
              content: "src/inject.tsx",
              popup: "popup.html",
              setting: "setting.html",
              service: "service/index.ts",
            },
            output: {
              entryFileNames: "[name]/index.js",
              chunkFileNames: "assets/js/[name].js",
              assetFileNames: (assetInfo: { name: string }) => {
                const { dir, name: _name } = path.parse(assetInfo.name);
                const assetFolder = dir.split("/").at(-1);
                const name = assetFolder + _name;
                return `assets/[ext]/${name}.chunk.[ext]`;
              },
            },
          }
        : undefined,
    },
  };
});
