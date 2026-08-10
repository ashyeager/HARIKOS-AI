import type { VercelRequest, VercelResponse } from "./types";
import { submitProjectInquiry } from "../src/server/projectInquiry";

export const config = { runtime: "nodejs" };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const result = await submitProjectInquiry(payload);
    res.status(result.status).json(result.body);
  } catch (error) {
    console.error("Project inquiry request failed:", error);
    res.status(500).json({ error: "Failed to process the inquiry." });
  }
}
