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
        target: 'http://8.134.155.193:8081',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/dev/, ''),
      },
    },
  },
});
