import { HomeScrollRoot } from '@/components/home/home-scroll-root'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  description:
    '8plus（八普拉斯）AI 顧問工作室，August Wang 主理：企業 AI 導入顧問、RAG 與地端模型、評測與系統整合，把 AI 想法做成團隊真的能用、可驗證、能持續維護的系統。',
  path: '/',
})

export default function HomePage() {
  return <HomeScrollRoot />
}
