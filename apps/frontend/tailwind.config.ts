import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F1F3D',
          foreground: '#FFFFFF',
        },
        accent: '#C9A227',
      },
    },
  },
  plugins: [forms],
};

export default config;
