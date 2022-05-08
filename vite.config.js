import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/Bustop/",
  publicPath : "./",
  server: {
    host: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    //css预处理
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/common/globalVariable.scss";'
      }
    }
  }
})
