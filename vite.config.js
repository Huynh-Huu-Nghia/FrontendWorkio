import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Proxy giúp tránh CORS trong môi trường dev bằng cách chuyển tiếp request sang BE cùng origin.
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        // Các endpoint login theo role
        '/admin-auth': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
        '/recruiter': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
        '/candidate': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
        // Nếu vẫn dùng các API /api/v1/...
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
