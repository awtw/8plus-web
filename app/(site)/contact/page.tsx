'use client'

import { useLanguage } from "@/components/language-provider";

export default function Contact() {
  const { t } = useLanguage();
  
  return (
    <div className='py-12 prose'>
      <h1>{t('contact.title')}</h1>
      <p>{t('contact.content')}</p>
      <p>Email: <a href='mailto:hello@8plus.app'>hello@8plus.app</a></p>
    </div>
  );
}