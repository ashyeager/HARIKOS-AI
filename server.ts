import compression from "compression";
import * as dotenv from "dotenv";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { submitProjectInquiry } from "./src/server/projectInquiry.ts";

dotenv.config();

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;
  app.use(compression());
  app.use(express.json({ limit: "100kb" }));
  app.post("/api/project-requests", async (req, res) => {
    try {
      const result = await submitProjectInquiry(req.body);
      res.status(result.status).json(result.body);
    } catch (error) {
      console.error("Project inquiry request failed:", error);
      res.status(500).json({ error: "Failed to process the inquiry." });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  app.listen(port, "0.0.0.0", () => console.log(`HARIKOS running at http://localhost:${port}`));
}

startServer().catch((error) => {
  console.error("HARIKOS server failed to start:", error);
  process.exitCode = 1;
});
