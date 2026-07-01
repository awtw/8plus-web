'use client'

import { useLanguage } from "@/components/language-provider"
import { ShareLinkHub } from "@/components/share/share-link-hub"
import { getShareBusinessLinks } from "@/lib/content/share-links"
import { shareBusinessTheme } from "@/lib/share-hub/themes"

export default function ShareBusinessPage() {
  const { locale } = useLanguage()
  const links = getShareBusinessLinks(locale)

  return (
    <ShareLinkHub
      variant="sb"
      theme={shareBusinessTheme}
      links={links}
      showPath
    />
  )
}
