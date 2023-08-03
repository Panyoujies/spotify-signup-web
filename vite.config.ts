import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteCompression from 'vite-plugin-compression';
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import {
    AntDesignVueResolver,
    ElementPlusResolver,
    NaiveUiResolver,
    VantResolver
} from "unplugin-vue-components/resolvers";
import {resolve} from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === 'build';
  return {
    resolve: {
      alias: {
        '@/': resolve('src') + '/',
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          }
        ],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [
          VantResolver(),
          NaiveUiResolver(),
          AntDesignVueResolver({
            importStyle: false,
          }),
          ElementPlusResolver()],
      }),
      // gzip 压缩
      ViteCompression({
        disable: !isBuild,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      })
    ],
    build: {
      target: 'chrome63',
      chunkSizeWarningLimit: 2000
    }
  }
})
