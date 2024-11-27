
import react from '@vitejs/plugin-react';
import { defineConfig as viteDefineConfig } from 'vite';
export default viteDefineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});