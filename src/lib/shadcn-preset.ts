import type { Config } from 'tailwindcss';
import { shadcnPlugin } from './shadcn-plugin';

//@ts-ignore
import animatePlugin from 'tailwindcss-animate';

export const shadcnPreset = {
  content: [],
  darkMode: ['class'],
  plugins: [animatePlugin, shadcnPlugin],
} satisfies Config;
