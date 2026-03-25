import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sentryVitePlugin } from "@sentry/vite-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sentryAuthOk =
  process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT;

/** CRA-style asset-manifest.json for WordPress (enqueue.php / shortcode.php). */
function craAssetManifestPlugin() {
  return {
    name: "cra-asset-manifest",
    closeBundle() {
      const outDir = path.resolve(__dirname, "build");
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) {
        return;
      }
      const html = fs.readFileSync(indexPath, "utf8");
      const files = {};
      const jsMatch = html.match(/src="([^"]+\.js)"/);
      const cssMatch = html.match(/href="([^"]+\.css)"/);
      if (jsMatch) {
        files["main.js"] = jsMatch[1].startsWith("/") ? jsMatch[1] : `/${jsMatch[1]}`;
      }
      if (cssMatch) {
        files["main.css"] = cssMatch[1].startsWith("/") ? cssMatch[1] : `/${cssMatch[1]}`;
      }
      fs.writeFileSync(
        path.join(outDir, "asset-manifest.json"),
        JSON.stringify({ files }, null, 2),
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    esbuild: {
      jsx: "automatic",
      loader: {
        ".js": "jsx",
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          ".js": "jsx",
        },
      },
    },
    plugins: [
      react({
        babel: {
          babelrc: false,
          configFile: false,
          presets: [["@babel/preset-react", { runtime: "automatic" }]],
        },
      }),
      craAssetManifestPlugin(),
      ...(sentryAuthOk
        ? [
            sentryVitePlugin({
              org: process.env.SENTRY_ORG,
              project: process.env.SENTRY_PROJECT,
              authToken: process.env.SENTRY_AUTH_TOKEN,
              telemetry: false,
            }),
          ]
        : []),
    ],
    root: ".",
    publicDir: "public",
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: [path.resolve(__dirname)],
        },
      },
    },
    build: {
      outDir: "build",
      sourcemap: true,
      chunkSizeWarningLimit: 1100,
    },
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: env.VITE_DEV_API_PROXY_TARGET || "http://127.0.0.1:9000",
          changeOrigin: true,
        },
      },
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode === "production" ? "production" : "development"),
      "process.env.PUBLIC_URL": JSON.stringify(""),
      "process.env.VITE_MAPBOX_ACCESS_TOKEN": JSON.stringify(env.VITE_MAPBOX_ACCESS_TOKEN ?? ""),
    },
  };
});
