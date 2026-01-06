import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'micro-focus', // 앱인토스 콘솔에서 설정한 앱 이름
  brand: {
    displayName: 'Micro-Focus', // 화면에 노출될 앱의 한글 이름
    primaryColor: '#3182F6', // 앱의 기본 색상 (파란색)
    icon: '', // 아이콘 없이 시작 (나중에 추가 가능)
  },
  web: {
    host: 'localhost',
    port: 3000,
    commands: {
      dev: 'vite',
      build: 'vite build',
    },
  },
  permissions: [],
});
