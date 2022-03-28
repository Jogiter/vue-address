import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/entry-lib.ts'),
      name: 'Foo',
      fileName: (format) => `vite.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'vue-demi'],
    },
  },
  resolve: {
    alias: [
      {
        find: 'china-division',
        replacement: resolve(
          __dirname,
          './node_modules/china-division/dist/pca.json'
        ),
      },
    ],
  },
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
})
