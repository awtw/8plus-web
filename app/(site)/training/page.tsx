'use client'

import { useLanguage } from '@/components/language-provider'
import { TrackPageView } from '@/components/tracks/track-page-view'
import { getTracksContent } from '@/lib/content/tracks'

export default function TrainingPage() {
  const { locale } = useLanguage()
  return <TrackPageView page={getTracksContent(locale).training} secondaryHref="/services" />
}
