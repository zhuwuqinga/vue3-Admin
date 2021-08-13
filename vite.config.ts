import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
const resolve = (dir: string) => path.join(__dirname, dir)

export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            // 这里这个name不能直接使用 因为element的组件文件都带有el-开头 但是样式文件并没有 所以导致引入的样式文件无法正常解析 这里只需要加上一句代码即可
            name = name.slice(3)

            return `element-plus/packages/theme-chalk/src/${name}.scss`
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
      assets: resolve('src/assets'),
      views: resolve('src/views'),
      components: resolve('src/components'),
    },
  },
  server: {
    host: '0.0.0.0', // 指定服务器主机名
    port: 3333, // 指定服务端口号
  },
  build: {
    target: 'es2015',
  },
})
