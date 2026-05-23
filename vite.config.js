import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function googlePhotoProxies(apiKey) {
  return {
    name: "google-photo-proxies",
    configureServer(server) {
      if (!apiKey) return;

      server.middlewares.use(async (req, res, next) => {
        try {
          if (req.url?.startsWith("/api/place-photo-v1/")) {
            const path = req.url.replace("/api/place-photo-v1/", "");
            const target = `https://places.googleapis.com/v1/${path}${path.includes("?") ? "&" : "?"}key=${apiKey}`;
            const r = await fetch(target, { redirect: "follow" });
            if (!r.ok) {
              res.statusCode = r.status;
              res.end();
              return;
            }
            res.setHeader("Content-Type", r.headers.get("content-type") || "image/jpeg");
            res.setHeader("Cache-Control", "public, max-age=86400");
            res.end(Buffer.from(await r.arrayBuffer()));
            return;
          }

          if (req.url?.startsWith("/api/place-photo?")) {
            const qs = req.url.slice("/api/place-photo".length);
            const target = `https://maps.googleapis.com/maps/api/place/photo${qs}&key=${apiKey}`;
            const r = await fetch(target, { redirect: "follow" });
            if (!r.ok) {
              res.statusCode = r.status;
              res.end();
              return;
            }
            res.setHeader("Content-Type", r.headers.get("content-type") || "image/jpeg");
            res.setHeader("Cache-Control", "public, max-age=86400");
            res.end(Buffer.from(await r.arrayBuffer()));
            return;
          }

          next();
        } catch {
          res.statusCode = 502;
          res.end();
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const googleKey = env.VITE_GOOGLE_MAPS_API_KEY || env.GOOGLE_MAPS_API_KEY || "";

  return {
    plugins: [react(), googlePhotoProxies(googleKey)],
    define: {
      "import.meta.env.VITE_GOOGLE_MAPS_API_KEY": JSON.stringify(googleKey),
    },
    envPrefix: ["VITE_", "GOOGLE_"],
  };
});
