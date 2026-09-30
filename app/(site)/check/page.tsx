'use client'

import '@/styles/pages/services.css'
import { useLanguage } from '@/components/language-provider'
import { PageSection } from '@/components/page/page-section'
import { PageHeader } from '@/components/page/page-header'
import { QuizChat } from '@/components/quiz/quiz-chat'

export default function CheckPage() {
  const { locale } = useLanguage()
  const en = locale === 'en'
  return (
    <PageSection field="blue" className="quiz-page">
      <PageHeader
        eyebrow="07 · NEEDS CHECK"
        title={en ? 'A 3-minute needs check' : '3 分鐘需求診斷'}
        lead={
          en
            ? 'Answer four quick questions and get a suggested way to work together — then book with the summary attached.'
            : '回答四個簡單問題，得到建議的合作方式與第一步，並可帶著摘要直接預約。'
        }
      />
      <QuizChat />
    </PageSection>
  )
}
