'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/language-provider'
import { blogContent } from '@/lib/content/blog'
import '@/styles/pages/blog.css'

export function BlogBackLink() {
  const { locale } = useLanguage()
  return (
    <Link href="/blog" className="blog-back">
      <span aria-hidden="true">←</span> {blogContent[locale].back}
    </Link>
  )
}
