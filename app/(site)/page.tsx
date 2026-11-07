import { HomeScrollRoot } from '@/components/home/home-scroll-root'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  description:
    'August Wang 的 AI 應用與 UIX 顧問工作室：RAG、地端模型、評測與系統整合，把 AI 想法做成團隊真的能用、可驗證、能持續維護的系統。',
  path: '/',
})

export default function HomePage() {
  return <HomeScrollRoot />
}
