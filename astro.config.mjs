// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  site: 'https://daybeldiaz.dev',
  integrations: [
    tailwind(), 
    icon(),
    sitemap()
  ],
  vite: {
    build: {
      sourcemap: env.SOURCE_MAP === 'true'
    }
  }
});