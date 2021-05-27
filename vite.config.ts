import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
import { resolve  } from 'path';
import { createVuePlugin } from 'vite-plugin-vue2';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/components/HelloWorld.vue'),
      name: 'MyLib',
    },
    rollupOptions: {
      external: [
        // 'vue',
        '@vue/composition-api'
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    createVuePlugin(),
    // vue()
  ],
});
