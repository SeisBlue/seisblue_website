import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsInlineLimit: 2048,
    rollupOptions: {
      input: {
        main: 'index.html',
        en: 'en/index.html',
        articles: 'articles/index.html',
        'articles-bluedisc': 'articles/bluedisc-shape-aware-loss/index.html',
        'articles-landscape': 'articles/ai-phase-picking-landscape/index.html',
        'en-articles': 'en/articles/index.html',
        'en-articles-bluedisc': 'en/articles/bluedisc-shape-aware-loss/index.html',
        'en-articles-landscape': 'en/articles/ai-phase-picking-landscape/index.html',
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
