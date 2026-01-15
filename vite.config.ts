
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Đảm bảo process.env không bị lỗi khi chạy trên trình duyệt
    'process.env': {}
  },
  server: {
    port: 3000,
    open: true
  }
});
