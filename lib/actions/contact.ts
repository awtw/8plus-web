'use server'

import { pushLineContactNotification } from "@/lib/notify/line";

export type ContactFormState = {
  ok: boolean;
  message: string;
};

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, message: "missing_fields" };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "invalid_email" };
  }

  const payload = {
    name,
    email,
    company: company || undefined,
    budget: budget || undefined,
    message,
    submittedAt: new Date().toISOString(),
    source: "8plus-contact-form",
  };

  const lineSent = await pushLineContactNotification(payload);
  if (lineSent) {
    return { ok: true, message: "success" };
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error("[contact] webhook failed", res.status, await res.text());
        return { ok: false, message: "webhook_error" };
      }
      return { ok: true, message: "success" };
    } catch (error) {
      console.error("[contact] webhook error", error);
      return { ok: false, message: "webhook_error" };
    }
  }

  console.info("[contact] submission (no LINE push / webhook)", payload);
  return { ok: true, message: "success" };
}
