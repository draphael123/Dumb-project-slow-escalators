import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        escaslow: {
          red: '#FF0000',
          yellow: '#FFD700',
          dark: '#1a1a1a',
        },
      },
      fontFamily: {
        neon: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config


