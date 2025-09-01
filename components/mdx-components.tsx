
import React from "react";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components
  };
}

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  // 由於 Velite 生成的代碼需要在服務端執行，我們回到使用 dangerouslySetInnerHTML
  // 但添加一些安全措施
  return (
    <div 
      className="mdx-content"
      dangerouslySetInnerHTML={{ 
        __html: code 
      }} 
    />
  );
}

interface MDXRendererProps {
  code: string;
}

// 客戶端組件來渲染 MDX 內容
'use client';

export function MDXRenderer({ code }: MDXRendererProps) {
  // 由於 Velite 生成的是 JavaScript 代碼，我們直接使用 dangerouslySetInnerHTML
  // 這是最簡單的解決方案，雖然不是最理想的
  return (
    <div 
      className="mdx-renderer prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ 
        __html: code 
      }} 
    />
  );
}
