'use client'

import { useActionState } from "react";
import Link from "next/link";
import { CalendarCheck } from "@phosphor-icons/react";
import { useLanguage } from "@/components/language-provider";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";
import { LineContactCard } from "@/components/line-contact-card";

const initialState: ContactFormState = { ok: false, message: "" };

export function ContactForm() {
  const { t } = useLanguage();
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  const errorMessages: Record<string, string> = {
    missing_fields: t("contact.errorMissing"),
    invalid_email: t("contact.errorEmail"),
    webhook_error: t("contact.errorGeneric"),
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <form action={formAction} className="surface-card space-y-4 p-6 sm:p-7">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-[color:var(--fg)]">
            {t("contact.name")}
          </label>
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            className="mt-2 w-full rounded-[var(--radius-md)] border border-border-soft bg-background px-4 py-3 text-sm text-[color:var(--fg)] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-[color:var(--fg)]">
            {t("contact.emailLabel")}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-[var(--radius-md)] border border-border-soft bg-background px-4 py-3 text-sm text-[color:var(--fg)] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-company" className="block text-sm font-medium text-[color:var(--fg)]">
              {t("contact.company")}
            </label>
            <input
              id="contact-company"
              name="company"
              autoComplete="organization"
              className="mt-2 w-full rounded-[var(--radius-md)] border border-border-soft bg-background px-4 py-3 text-sm text-[color:var(--fg)] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
            />
          </div>
          <div>
            <label htmlFor="contact-budget" className="block text-sm font-medium text-[color:var(--fg)]">
              {t("contact.budget")}
            </label>
            <select
              id="contact-budget"
              name="budget"
              className="mt-2 w-full rounded-[var(--radius-md)] border border-border-soft bg-background px-4 py-3 text-sm text-[color:var(--fg)] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
            >
              <option value="">{t("contact.budgetUnset")}</option>
              <option value="advisory">{t("contact.budgetAdvisory")}</option>
              <option value="project">{t("contact.budgetProject")}</option>
              <option value="workshop">{t("contact.budgetWorkshop")}</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-[color:var(--fg)]">
            {t("contact.message")}
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            className="mt-2 w-full rounded-[var(--radius-md)] border border-border-soft bg-background px-4 py-3 text-sm text-[color:var(--fg)] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
          />
        </div>
        {state.message && !state.ok && (
          <p className="text-sm text-red-600" role="alert">
            {errorMessages[state.message] ?? t("contact.errorGeneric")}
          </p>
        )}
        {state.ok && (
          <p className="text-sm text-[color:var(--success)]" role="status">
            {t("contact.success")}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="brand-button-primary inline-flex items-center gap-2 disabled:opacity-60"
        >
          {pending ? t("contact.sending") : t("contact.submit")}
        </button>
      </form>

      <aside className="surface-card-strong flex flex-col justify-between p-6 sm:p-7">
        <div>
          <p className="eyebrow">{t("contact.quickBook")}</p>
          <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em]">{t("contact.quickBookTitle")}</h2>
          <p className="mt-3 text-sm leading-7 text-[color:var(--fg-2)]">{t("contact.quickBookLead")}</p>
        </div>
        <div className="mt-6 space-y-3">
          <LineContactCard />
          <Link href="/booking" className="brand-button-primary inline-flex w-full items-center justify-center gap-2">
            <CalendarCheck className="h-4 w-4" weight="bold" />
            {t("contact.bookCta")}
          </Link>
          <p className="text-center text-sm text-[color:var(--muted)]">
            Email:{" "}
            <a href="mailto:hello@8plus.app" className="text-[color:var(--fg)] underline underline-offset-4">
              hello@8plus.app
            </a>
          </p>
        </div>
      </aside>
    </div>
  );
}
