'use client'

import { useLanguage } from "@/components/language-provider";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="section-shell py-10 sm:py-14 lg:py-16">
      <header className="mb-8 max-w-2xl">
        <h1 className="display-title text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.04em]">
          {t("contact.title")}
        </h1>
        <p className="body-lead mt-4">{t("contact.lead")}</p>
      </header>
      <ContactForm />
    </div>
  );
}
