'use client'

import { useLanguage } from "@/components/language-provider"
import { ShareLinkHub } from "@/components/share/share-link-hub"
import { getShareSocialLinks } from "@/lib/content/share-links"
import { shareSocialTheme } from "@/lib/share-hub/themes"

export default function ShareSocialPage() {
  const { locale } = useLanguage()
  const links = getShareSocialLinks(locale)

  return (
    <ShareLinkHub
      variant="sc"
      theme={shareSocialTheme}
      links={links}
    />
  )
}
