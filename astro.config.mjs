// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` is required for sitemap.xml and canonical URLs. The real domain is
// not decided yet [TO CONFIRM]; this is the Vercel preview address. Change it when PDH chooses a domain.
export default defineConfig({
  site: 'https://pdhcomph.vercel.app',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { format: 'directory' },
});
