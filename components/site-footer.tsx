
'use client'

import { useLanguage } from "./language-provider";

export default function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-lg text-gray-900">8plus</span>
              <span className="text-gray-400">·</span>
              <span className="text-sm text-gray-600">Engineering & Consulting</span>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} 8plus. Built with Next.js 15 + Velite.
            </p>
          </div>
          
          <div className="flex flex-col md:items-end gap-2">
                        <p className="text-sm text-gray-600">
              Metaphysics & UIX longform at{' '}
              <a
                className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
                href="https://shuyan.art"
                target="_blank"
                rel="noopener noreferrer"
              >
                shuyan.art
              </a>
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Made in Taiwan</span>
              <span>·</span>
              <span>Powered by Vercel</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
