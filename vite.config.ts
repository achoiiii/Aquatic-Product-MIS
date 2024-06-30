import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // 代理配置
  server: {
    proxy: {
      '/dev': {
        target: 'https://www.taishangongrong.com',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/dev/, ''),
      },
      '/prod': {
        target: 'https://www.taishangongrong.com',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/prod/, ''),
      },
    },
  },
});
