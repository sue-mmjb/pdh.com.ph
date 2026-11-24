// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` is required for sitemap.xml and canonical URLs. The real domain is
// not decided yet [TO CONFIRM]; change it here once PDH chooses a host.
export default defineConfig({
  site: 'https://pdh-prototype.example.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { format: 'directory' },
});
