import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import packageJson from "./package.json";
import makeManifest from "./manifest";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isExt = mode === "extension";
  const env = loadEnv(mode, process.cwd()) as ImportMetaEnv;

  return {
    server: {
      port: 3000,
    },

    plugins: [
      react(),
      isExt
        ? makeManifest({
            version: packageJson.version,
            appId: env.VITE_APP_ID,
            hostBaseUrl: env.VITE_APP_HOST_BASE_URL,
          })
        : null,
    ].filter(Boolean),

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
