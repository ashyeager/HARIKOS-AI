import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { type FormEvent, useState } from "react";

const topics = {
  "harikos-ai": "HARIKOS AI updates",
  "x-agency": "The X Agency project",
  general: "General HARIKOS inquiry",
} as const;

type Topic = keyof typeof topics;

type ContactFormProps = {
  initialTopic?: string | null;
};

export default function ContactForm({ initialTopic }: ContactFormProps) {
  const safeInitialTopic: Topic = initialTopic && initialTopic in topics ? initialTopic as Topic : "general";
  const [form, setForm] = useState({ name: "", email: "", company: "", topic: safeInitialTopic, message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== "idle" && status !== "submitting") {
      setStatus("idle");
      setStatusMessage("");
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setStatusMessage("");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12_000);

    try {
      const response = await fetch("/api/project-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          full_name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim() || "Independent inquiry",
          industry: "Not specified",
          service: topics[form.topic],
          description: form.message.trim(),
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "The message could not be sent right now.");

      setStatus("success");
      setStatusMessage("Message received. HARIKOS will follow up by email.");
      setForm((current) => ({ ...current, name: "", email: "", company: "", message: "" }));
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof DOMException && error.name === "AbortError"
        ? "The request timed out. Please try again."
        : error instanceof Error ? error.message : "The message could not be sent right now.");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  return (
    <form className="contact-form" onSubmit={submit} aria-busy={status === "submitting"}>
      <fieldset>
        <legend>What is this about?</legend>
        <div className="topic-options">
          {(Object.entries(topics) as Array<[Topic, string]>).map(([value, label]) => (
            <label key={value} className={form.topic === value ? "is-selected" : ""}>
              <input
                type="radio"
                name="topic"
                value={value}
                checked={form.topic === value}
                onChange={() => update("topic", value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-grid">
        <label>
          <span>Name</span>
          <input required autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" />
        </label>
        <label>
          <span>Email</span>
          <input required type="email" autoComplete="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@company.com" />
        </label>
      </div>
      <label>
        <span>Company / project <em>Optional</em></span>
        <input autoComplete="organization" value={form.company} onChange={(event) => update("company", event.target.value)} placeholder="Company or project name" />
      </label>
      <label>
        <span>Message</span>
        <textarea required maxLength={1200} value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="What would you like to build, follow, or discuss?" />
        <small className="form-counter">{form.message.length} / 1200</small>
      </label>
      <div className="form-actions">
        <button className="button button--primary" type="submit" disabled={status === "submitting" || status === "success"}>
          {status === "submitting" ? "Sending…" : status === "success" ? "Message received" : "Send message"}
          {status === "submitting" ? <LoaderCircle className="is-spinning" aria-hidden="true" /> : status === "success" ? <Check aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
        </button>
        <p aria-live="polite" className={status === "error" ? "is-error" : status === "success" ? "is-success" : ""}>
          {statusMessage || "A direct reply from HARIKOS. No automated sales sequence."}
        </p>
      </div>
    </form>
  );
}
