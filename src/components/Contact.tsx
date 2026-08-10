import { FormEvent, useState } from "react";
import { ArrowRight, Check, Instagram, Mail } from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  company: "",
  industry: "",
  interest: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/project-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          industry: form.industry,
          service: form.interest,
          description: form.message.trim(),
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "We couldn't submit your message right now.");
      }

      setStatus("success");
      setStatusMessage("Your message has been received. HARIKOS will follow up by email.");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "We couldn't submit your message right now.");
    }
  };

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status === "error") setStatus("idle");
  };

  return (
    <section id="contact" className="relative z-10 border-t border-white/[0.06] px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E5A93C]">Contact</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Follow the build or start a project.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-brand-gray-400">
              Get updates on HARIKOS AI, talk to H Studio about a business need, or simply start a conversation with HARIKOS.
            </p>

            <div className="mt-8 flex flex-col gap-4 text-sm text-brand-gray-400">
              <a href="https://instagram.com/harikos.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 transition hover:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]"><Instagram className="h-4 w-4" /></span>
                @harikos.ai
              </a>
              <a href="mailto:ashyeagerhq@gmail.com" className="inline-flex items-center gap-3 transition hover:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]"><Mail className="h-4 w-4" /></span>
                ashyeagerhq@gmail.com
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025))] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.3)] sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-brand-gray-300">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-brand-gray-500">Name</span>
                <input required autoComplete="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-brand-gray-600 focus:border-[#E5A93C]" placeholder="Your name" />
              </label>
              <label className="text-sm text-brand-gray-300">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-brand-gray-500">Email</span>
                <input required type="email" autoComplete="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-brand-gray-600 focus:border-[#E5A93C]" placeholder="you@company.com" />
              </label>
              <label className="text-sm text-brand-gray-300">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-brand-gray-500">Company / project</span>
                <input required autoComplete="organization" value={form.company} onChange={(event) => updateField("company", event.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-brand-gray-600 focus:border-[#E5A93C]" placeholder="Company or project name" />
              </label>
              <label className="text-sm text-brand-gray-300">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-brand-gray-500">Industry</span>
                <select required value={form.industry} onChange={(event) => updateField("industry", event.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#0b0b0d] px-4 py-3 text-sm text-white outline-none transition focus:border-[#E5A93C]">
                  <option value="" disabled>Select one</option>
                  <option>Hospitality</option>
                  <option>Retail / Ecommerce</option>
                  <option>Professional Services</option>
                  <option>Technology</option>
                  <option>Other</option>
                </select>
              </label>
            </div>
            <label className="mt-4 block text-sm text-brand-gray-300">
              <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-brand-gray-500">I'm interested in</span>
              <select required value={form.interest} onChange={(event) => updateField("interest", event.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#0b0b0d] px-4 py-3 text-sm text-white outline-none transition focus:border-[#E5A93C]">
                <option value="" disabled>Select one</option>
                <option>HARIKOS AI updates</option>
                <option>H Studio project</option>
                <option>General HARIKOS inquiry</option>
              </select>
            </label>
            <label className="mt-4 block text-sm text-brand-gray-300">
              <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-brand-gray-500">Message</span>
              <textarea required value={form.message} onChange={(event) => updateField("message", event.target.value)} className="min-h-32 w-full resize-y rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-brand-gray-600 focus:border-[#E5A93C]" placeholder="What would you like to know or build?" />
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button disabled={status === "submitting"} type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#E5A93C] px-6 py-3 text-sm font-bold text-[#130d04] transition hover:bg-[#F2C66D] disabled:cursor-wait disabled:opacity-60">
                {status === "submitting" ? "Sending..." : status === "success" ? "Message received" : "Send message"}
                {status === "success" ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </button>
              <p aria-live="polite" className={`max-w-sm text-xs leading-5 ${status === "error" ? "text-red-300" : status === "success" ? "text-emerald-300" : "text-brand-gray-500"}`}>
                {statusMessage || "No spam. Just a direct reply from HARIKOS."}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
