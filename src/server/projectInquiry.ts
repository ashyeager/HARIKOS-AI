import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

type InquiryResponse = { status: number; body: Record<string, unknown> };

const asText = (value: unknown) => typeof value === "string" ? value.trim() : "";
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
})[character] ?? character);

export async function submitProjectInquiry(payload: unknown): Promise<InquiryResponse> {
  const data = typeof payload === "object" && payload !== null ? payload as Record<string, unknown> : {};
  const inquiry = {
    user_id: asText(data.user_id) || null,
    full_name: asText(data.full_name),
    email: asText(data.email),
    company: asText(data.company),
    industry: asText(data.industry),
    service: asText(data.service),
    budget: asText(data.budget) || null,
    description: asText(data.description),
    status: "New",
    created_at: new Date().toISOString(),
  };

  if (!inquiry.full_name || !inquiry.email || !inquiry.company || !inquiry.industry || !inquiry.service || !inquiry.description) {
    return { status: 400, body: { error: "All required fields must be provided." } };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    return { status: 400, body: { error: "Please provide a valid email address." } };
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return { status: 503, body: { error: "Inquiry submissions are temporarily unavailable. Please contact HARIKOS directly." } };
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error: insertError } = await supabase.from("project_requests").insert(inquiry);
  if (insertError) {
    console.error("Supabase inquiry insert failed:", insertError);
    return { status: 500, body: { error: "We could not save your inquiry right now." } };
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const resend = new Resend(resendKey);
    const from = process.env.RESEND_FROM_EMAIL || "HARIKOS <onboarding@resend.dev>";
    const adminEmail = process.env.ADMIN_EMAIL || "ashyeagerhq@gmail.com";
    const safe = Object.fromEntries(Object.entries(inquiry).map(([key, value]) => [key, escapeHtml(String(value ?? ""))]));
    const results = await Promise.allSettled([
      resend.emails.send({ from, to: [adminEmail], subject: `New HARIKOS inquiry: ${inquiry.service}`, html: `<h2>New HARIKOS inquiry</h2><p><strong>Name:</strong> ${safe.full_name}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Company:</strong> ${safe.company}</p><p><strong>Interest:</strong> ${safe.service}</p><p><strong>Message:</strong><br />${safe.description.replace(/\n/g, "<br />")}</p>` }),
      resend.emails.send({ from, to: [inquiry.email], subject: "We've received your HARIKOS message", html: `<p>Hello ${safe.full_name},</p><p>Thank you for contacting HARIKOS. We have received your message and will review it shortly.</p><p>HARIKOS</p>` }),
    ]);
    for (const result of results) if (result.status === "rejected") console.error("Inquiry email failed:", result.reason);
  }

  return { status: 200, body: { success: true, message: "Inquiry received successfully.", emailConfigured: Boolean(resendKey) } };
}
