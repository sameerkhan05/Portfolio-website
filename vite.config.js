// vite.config.js
import { defineConfig } from 'vite';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://leetcode.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, // Remove '/api' from the beginning of the path
        secure: false, // If your API endpoint is using HTTPS, set this option to false
      },
    },
  },
});
