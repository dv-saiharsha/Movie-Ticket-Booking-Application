// Import type for TypeScript (if needed)
// import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class', // Enable class-based dark mode
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: {
          DEFAULT: '#feda6a',
        },
        silver: {
          DEFAULT: '#d4d4dc',
        },
        matte: {
          DEFAULT: '#393f4d',
        },
        slate: {
          DEFAULT: '#1d1e22',
        },
        white: {
          DEFAULT: '#FFFFFF',
          50: '#FFFFFF',
          100: '#F9F9F9',
          200: '#F3F3F3',
          300: '#EDEDED',
          400: '#E7E7E7',
          500: '#E1E1E1',
          600: '#DBDBDB',
          700: '#D5D5D5',
          800: '#CFCFCF',
          900: '#C9C9C9',
        },
      },
      boxShadow: {
        'yellow': '0 2px 8px 0 rgba(254, 218, 106, 0.15)',
        'matte': '0 2px 8px 0 rgba(57, 63, 77, 0.15)',
        'slate': '0 2px 8px 0 rgba(29, 30, 34, 0.15)',
      },
    },
  },
}
