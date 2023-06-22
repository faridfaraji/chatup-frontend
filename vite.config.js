import { defineConfig } from "vite";
import { dirname } from "path";
import { fileURLToPath } from "url";
import https from "https";
import react from "@vitejs/plugin-react";
import dotenv from 'dotenv'
dotenv.config()
// import { createProxyMiddleware } from 'http-proxy-middleware';

if (
  process.env.npm_lifecycle_event === "build" &&
  !process.env.CI &&
  !process.env.SHOPIFY_API_KEY
) {
  console.warn(
    "\nBuilding the frontend app without an API key. The frontend build will not run without an API key. Set the SHOPIFY_API_KEY environment variable when running the build command.\n"
  );
}

const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const proxyOptions = {
  target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false,
};


const proxyOptionsLauch = {
  target: `${process.env.BACKEND_URL}`,
  changeOrigin: true, // false if frontend and gateway are on the same server, true otherwise
  secure: false, // true if BACKEND_URL is https, false if http
  ws: false,
  rewrite: (path) => { 
    return path.replace('/', `/v1/shopify/${process.env.APP_NAME}`)
  },
};


const host = process.env.HOST
  ? process.env.HOST.replace(/https?:\/\//, "")
  : "localhost";

let hmrConfig;
if (host === "localhost") {
  hmrConfig = {
    protocol: "ws",
    host: "localhost",
    port: 64999,
    clientPort: 64999,
  };
} else {
  hmrConfig = {
    protocol: "wss",
    host: host,
    port: process.env.FRONTEND_PORT,
    clientPort: 443,
  };
}

export default defineConfig({
  root: dirname(fileURLToPath(import.meta.url)),
  plugins: [react(),
    {
      name: 'request-logger',
      configureServer({ middlewares }) {
        middlewares.use(requestLogger);
      },
    }
  ],
  define: {
    "process.env.SHOPIFY_API_KEY": JSON.stringify(process.env.SHOPIFY_API_KEY),
  },
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    host: "localhost",
    port: process.env.FRONTEND_PORT,
    hmr: hmrConfig,
    proxy: {
      "^/(\\?.*)?$": proxyOptionsLauch,
      "^/api(/|(\\?.*)?$)": proxyOptions,
    },
  },
});
