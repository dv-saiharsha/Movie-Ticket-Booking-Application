// Import type for TypeScript (if needed)
// import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class', // Enable class-based dark mode
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#1A1414', // Top stripe
        },
        darkred: {
          DEFAULT: '#8B1414', // Second stripe
        },
        red: {
          DEFAULT: '#D94343', // Third stripe
        },
        lightgrey: {
          DEFAULT: '#F2F2F2', // Bottom stripe
        },
        error: {
          DEFAULT: '#8B1414',
        },
        success: {
          DEFAULT: '#16A6A6',
        },
        white: {
          DEFAULT: '#FFFFFF',
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
