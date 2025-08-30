
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // 8plus 品牌色彩系统 - 灰黑白色调
        brand: {
          // 黑色系列
          black: '#0A0A0A',
          'black-light': '#1A1A1A',
          
          // 灰色系列
          gray: {
            50: '#F9FAFB',
            100: '#F3F4F6', 
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          },
          
          // 白色系列
          white: '#FFFFFF',
          'white-soft': '#FEFEFE',
          
          // 强调色 (minimal accent)
          accent: '#2563EB', // 保留少量蓝色作为交互强调
          'accent-light': '#3B82F6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.brand.gray.700'),
            h1: { color: theme('colors.brand.black') },
            h2: { color: theme('colors.brand.black') },
            h3: { color: theme('colors.brand.black') },
            h4: { color: theme('colors.brand.black') },
            strong: { color: theme('colors.brand.black') },
            code: { 
              color: theme('colors.brand.gray.800'),
              backgroundColor: theme('colors.brand.gray.100'),
            },
          },
        },
      }),
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
export default config;
