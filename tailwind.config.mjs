import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // ── Nature/Outdoors theme (modern redesign) ────────────────────────────
      // Primary: Forest green palette inspired by the Rävsta outdoor range
      // Secondary: Earthy brown/amber tones
      colors: {
        // Forest greens
        forest: {
          50:  '#f0f7f0',
          100: '#dceddc',
          200: '#badcba',
          300: '#8ec38e',
          400: '#5ea35e',
          500: '#3d833d',
          600: '#2d682d',  // ← primary action color
          700: '#245224',
          800: '#1e421e',
          900: '#19371a',
          950: '#0c1e0c',
        },
        // Earthy amber / bark
        bark: {
          50:  '#fdf8f0',
          100: '#faeedd',
          200: '#f4d9b5',
          300: '#ecbe82',
          400: '#e29e4d',
          500: '#d98428',  // ← secondary accent
          600: '#c06920',
          700: '#9f511c',
          800: '#81421e',
          900: '#6a381b',
          950: '#391b0c',
        },
        // Parchment / warm off-white for backgrounds
        parchment: {
          50:  '#fdfbf7',
          100: '#f9f4ea',
          200: '#f2e8d2',
          300: '#e8d5ad',
          400: '#dbb97d',
        },
        // Classic/faithful theme — original WordPress site blue (#299AD1)
        classic: {
          50:  '#eaf6fc',
          100: '#c5e8f6',
          200: '#96d3ee',
          300: '#5bb9e4',
          400: '#36a8d8',
          500: '#299ad1',  // ← original site primary blue
          600: '#1e7aaa',
          700: '#165d82',
          800: '#0f4060',
          900: '#082540',
        },
      },

      fontFamily: {
        // Self-hosted fonts (added to /src/assets/fonts/)
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },

      // Faithful recreation of existing site spacing
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [
    typography,
  ],
};
