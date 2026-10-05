'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { posts } from '.velite'
import { useLanguage } from '@/components/language-provider'
import { getLocalizedProjects } from '@/lib/projects'
import { siteNavigation } from '@/lib/navigation'
import { track } from '@/lib/analytics'
import '@/styles/command-palette.css'

type Entry = { id: string; group: 'page' | 'lab' | 'post'; title: string; hint: string; href: string; haystack: string }

const GROUP_LABEL = {
  'zh-TW': { page: '頁面', lab: 'Lab 專案', post: '文章', empty: '找不到相關內容', placeholder: '搜尋頁面、專案、文章…', hint: '↑↓ 選擇 · Enter 開啟 · Esc 關閉' },
  en: { page: 'Pages', lab: 'Lab', post: 'Posts', empty: 'Nothing found', placeholder: 'Search pages, projects, posts…', hint: '↑↓ select · Enter open · Esc close' },
} as const

const norm = (s: string) => s.toLowerCase().normalize('NFKC')

export default function CommandPalettePanel({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const router = useRouter()
  const { t, locale } = useLanguage()
  const L = GROUP_LABEL[locale === 'en' ? 'en' : 'zh-TW']
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)

  const entries = useMemo<Entry[]>(() => {
    const pages: Entry[] = [
      ...siteNavigation.map((item) => {
        const labelKey = 'labelKey' in item ? item.labelKey : `nav.${item.key}`
        const title = t(labelKey)
        return { id: `p-${item.href}`, group: 'page' as const, title, hint: item.href, href: item.href, haystack: norm(`${title} ${item.key} ${item.href}`) }
      }),
      { id: 'p-training', group: 'page', title: locale === 'en' ? 'Training' : '教育訓練', hint: '/training', href: '/training', haystack: norm('training 教育訓練 工作坊 內訓 workshop') },
      { id: 'p-career', group: 'page', title: locale === 'en' ? 'Career talks' : '職涯探討', hint: '/career', href: '/career', haystack: norm('career 職涯 探討 轉職 1:1') },
      { id: 'p-check', group: 'page', title: locale === 'en' ? 'Needs check' : '需求診斷', hint: '/check', href: '/check', haystack: norm('quiz check 需求診斷 診斷 評估') },
    ]
    const labs: Entry[] = getLocalizedProjects(locale === 'en' ? 'en' : 'zh-TW').map((p) => ({
      id: `l-${p.slug}`, group: 'lab', title: p.title, hint: p.summary, href: p.url,
      haystack: norm(`${p.title} ${p.summary} ${(p.stack ?? []).join(' ')} ${p.role ?? ''}`),
    }))
    const blog: Entry[] = posts
      .filter((p) => p.locale === (locale === 'en' ? 'en' : 'zh-TW'))
      .map((p) => ({ id: `b-${p.slug}`, group: 'post', title: p.title, hint: p.summary, href: p.url, haystack: norm(`${p.title} ${p.summary} ${(p.tags ?? []).join(' ')}`) }))
    return [...pages, ...labs, ...blog]
  }, [locale, t])

  const results = useMemo(() => {
    const tokens = norm(query).split(/\s+/).filter(Boolean)
    if (tokens.length === 0) return entries.filter((e) => e.group === 'page').concat(entries.filter((e) => e.group !== 'page').slice(0, 6))
    return entries
      .map((e) => {
        if (!tokens.every((tok) => e.haystack.includes(tok))) return null
        const titleHit = tokens.every((tok) => norm(e.title).includes(tok)) ? 0 : 1
        return { e, score: titleHit }
      })
      .filter((r): r is { e: Entry; score: number } => r !== null)
      .sort((a, b) => a.score - b.score)
      .map((r) => r.e)
      .slice(0, 30)
  }, [entries, query])

  useEffect(() => { setIndex(0) }, [query])
  useEffect(() => { if (!open) setQuery('') }, [open])
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [index])

  const go = (entry: Entry) => {
    track('search_select', { group: entry.group, query_length: query.length })
    onOpenChange(false)
    router.push(entry.href)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIndex((i) => Math.min(i + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter' && results[index]) { e.preventDefault(); go(results[index]) }
  }

  const showHeader = results.map((r, i) => i === 0 || results[i - 1].group !== r.group)
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="cmdk-overlay" />
        <Dialog.Content className="cmdk-content" aria-describedby={undefined}>
          <Dialog.Title className="sr-only">{L.placeholder}</Dialog.Title>
          <div className="cmdk-input-row">
            <MagnifyingGlass size={20} aria-hidden="true" />
            <input
              autoFocus
              className="cmdk-input"
              placeholder={L.placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              role="combobox"
              aria-expanded="true"
              aria-controls="cmdk-list"
              aria-activedescendant={results[index] ? `cmdk-${results[index].id}` : undefined}
              enterKeyHint="go"
            />
          </div>
          <ul id="cmdk-list" role="listbox" ref={listRef} className="cmdk-list">
            {results.length === 0 && <li className="cmdk-empty">{L.empty}</li>}
            {results.map((r, i) => {
              const header = showHeader[i] ? L[r.group] : null
              return (
                <li key={r.id} role="presentation">
                  {header && <div className="cmdk-group">{header}</div>}
                  <div
                    id={`cmdk-${r.id}`}
                    role="option"
                    aria-selected={i === index}
                    className={`cmdk-item${i === index ? ' is-active' : ''}`}
                    onMouseMove={() => setIndex(i)}
                    onClick={() => go(r)}
                  >
                    <span className="cmdk-item-title">{r.title}</span>
                    <span className="cmdk-item-hint">{r.hint}</span>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="cmdk-foot">{L.hint}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
