'use client'

import { useLanguage } from '@/components/language-provider'
import { blogContent } from '@/lib/content/blog'
import '@/styles/pages/blog.css'

/** Protected-post notice; copy follows the site language. */
export function BlogProtectedNote() {
  const { locale } = useLanguage()
  const c = blogContent[locale]
  return (
    <div className="blog-protected" role="note">
      <strong>{c.protectedLabel}</strong>
      <span>{c.protectedBody}</span>
    </div>
  )
}
