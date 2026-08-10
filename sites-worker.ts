type SitesEnv = {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  ADMIN_EMAIL?: string;
};

const asText = (value: unknown) => typeof value === "string" ? value.trim() : "";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "content-type": "application/json; charset=utf-8" },
});

async function submitInquiry(request: Request, env: SitesEnv) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const data = await request.json().catch(() => null) as Record<string, unknown> | null;
  const inquiry = {
    user_id: data ? asText(data.user_id) || null : null,
    full_name: data ? asText(data.full_name) : "",
    email: data ? asText(data.email) : "",
    company: data ? asText(data.company) : "",
    industry: data ? asText(data.industry) : "",
    service: data ? asText(data.service) : "",
    budget: data ? asText(data.budget) || null : null,
    description: data ? asText(data.description) : "",
    status: "New",
    created_at: new Date().toISOString(),
  };

  if (!inquiry.full_name || !inquiry.email || !inquiry.company || !inquiry.industry || !inquiry.service || !inquiry.description) {
    return json({ error: "All required fields must be provided." }, 400);
  }
  if (!emailPattern.test(inquiry.email)) return json({ error: "Please provide a valid email address." }, 400);
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return json({ error: "Inquiry submissions are temporarily unavailable. Please contact HARIKOS directly." }, 503);
  }

  const insertResponse = await fetch(`${env.SUPABASE_URL.replace(/\/$/, "")}/rest/v1/project_requests`, {
    method: "POST",
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "content-type": "application/json",
      prefer: "return=minimal",
    },
    body: JSON.stringify(inquiry),
  });
  if (!insertResponse.ok) {
    console.error("Supabase inquiry insert failed", insertResponse.status);
    return json({ error: "We could not save your inquiry right now." }, 500);
  }

  if (env.RESEND_API_KEY) {
    const from = env.RESEND_FROM_EMAIL || "HARIKOS <onboarding@resend.dev>";
    const adminEmail = env.ADMIN_EMAIL || "ashyeagerhq@gmail.com";
    const plainSummary = `Name: ${inquiry.full_name}\nEmail: ${inquiry.email}\nCompany: ${inquiry.company}\nInterest: ${inquiry.service}\n\n${inquiry.description}`;
    const headers = { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" };
    const emailResults = await Promise.allSettled([
      fetch("https://api.resend.com/emails", { method: "POST", headers, body: JSON.stringify({ from, to: [adminEmail], subject: `New HARIKOS inquiry: ${inquiry.service}`, text: plainSummary }) }),
      fetch("https://api.resend.com/emails", { method: "POST", headers, body: JSON.stringify({ from, to: [inquiry.email], subject: "We've received your HARIKOS message", text: `Hello ${inquiry.full_name},\n\nThank you for contacting HARIKOS. We have received your message and will review it shortly.\n\nHARIKOS` }) }),
    ]);
    for (const result of emailResults) if (result.status === "rejected") console.error("Inquiry email failed", result.reason);
  }

  return json({ success: true, message: "Inquiry received successfully.", emailConfigured: Boolean(env.RESEND_API_KEY) });
}

export default {
  async fetch(request: Request, env: SitesEnv): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/project-requests") return submitInquiry(request, env);
    return env.ASSETS.fetch(request);
  },
};
