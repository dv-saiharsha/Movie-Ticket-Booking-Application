// Import type for TypeScript (if needed)
// import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class', // Enable class-based dark mode
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#000000', 
        },
        // Midnight Purple & Neon Theme
        figma: {
            bg: '#0F0A1E',     // Deep Midnight Purple
            card: '#1B1236',   // Lighter Violet Surface
            accent: '#F72585', // Neon Pink
            secondary: '#4CC9F0', // Neon Cyan
            gold: '#FFD166',   // Bright Gold
            text: '#F8F9FA',   // White-ish text
            muted: '#9CA3AF',  // Gray text
            red: '#EF476F',    // Vibrant Red/Pinkish
        },
        darkred: {
          DEFAULT: '#560BAD', // Re-purposing to Deep Purple for legacy components
        },
        red: {
          DEFAULT: '#F72585', // Mapping Red to Neon Pink
        },
        lightgrey: {
          DEFAULT: '#F8F9FA', 
        },
        error: {
          DEFAULT: '#EF476F',
        },
        success: {
          DEFAULT: '#06D6A0', // Neon Green
        },
        white: {
          DEFAULT: '#FFFFFF',
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(247, 37, 133, 0.5)',
        'neon': '0 0 10px rgba(76, 201, 240, 0.3)',
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(to right, #4361ee, #4cc9f0)',
        'purple-gradient': 'linear-gradient(to right, #7209b7, #f72585)',
      }
    },
  },
}
