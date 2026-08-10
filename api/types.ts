export type VercelRequest = {
  method?: string;
  body?: unknown;
};

export type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
};
