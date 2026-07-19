/** Minimal structural types for Vercel's Node.js request/response objects.
 * Vercel provides these objects at runtime; keeping them local avoids a runtime
 * dependency solely for TypeScript declarations. */
export interface VercelRequest {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
}

export interface VercelResponse {
  status: (statusCode: number) => VercelResponse;
  json: (body: unknown) => void;
}
