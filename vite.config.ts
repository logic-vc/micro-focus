import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // 상대 경로로 빌드하여 GitHub Pages에서 작동하도록 설정
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
});
