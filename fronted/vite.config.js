import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
import sassConfig from './sass.js'

// 抑制 Node.js 弃用警告
process.noDeprecation = true
process.env.SASS_API = 'new'

export default defineConfig({
  plugins: [
    vue({
      template: { compilerOptions: { whitespace: 'preserve' } }
    }),
    vueJsx(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `@use "@/styles/variables.scss" as *;`,
        sassOptions: sassConfig,
      }
    },
    devSourcemap: false
  },
  server: {
    port: 8081,
    host: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    },
    historyApiFallback: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // 调试环境先保留 console
        drop_debugger: false
      }
    },
    chunkSizeWarningLimit: 2000, // 提高警告限制
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        manualChunks: {
          'vue-core': ['vue', 'vue-router', 'pinia'],
          'element-plus': ['element-plus'],
          'icons': ['@element-plus/icons-vue'],
          'utils': ['axios', 'echarts', 'lodash-es']
          // 取消 vendor 拆分，避免顺序冲突
        }
      }
    },
    sourcemap: false,
    target: 'es2015'
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'axios', '@element-plus/icons-vue'],
    force: true
  },
  clearScreen: false
})