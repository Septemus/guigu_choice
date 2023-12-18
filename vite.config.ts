import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import legacy from "@vitejs/plugin-legacy";
import { createHtmlPlugin } from "vite-plugin-html";
import eslintPlugin from "vite-plugin-eslint";
import {
  createStyleImportPlugin,
  ElementPlusResolve,
} from "vite-plugin-style-import";

const getTarget = (mode, target) => {
  return loadEnv(mode, process.cwd())[target];
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      //按需导入组件样式
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()],
        libs: [
          {
            libraryName: "element-plus",
            esModule: true,
            resolveStyle: (name) => {
              return `element-plus/theme-chalk/${name}.css`;
            },
          },
        ],
      }),
      legacy({
        targets: ["defaults", "ie >= 10", "chrome 52"], //需要兼容的目标列表，可以设置多个
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: getTarget(mode, "VITE_APP_TITLE"),
          },
        },
      }),
      eslintPlugin({
        include: ["src/**/*.ts", "src/**/*.vue"],
      }),
    ],
    base: "./",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist", //指定打包输出路径
      assetsDir: "static", //指定静态资源存放路径
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          chunkFileNames: "js/chunk_[name]-[hash].js",
          entryFileNames: "js/entry_[name]-[hash].js",
          assetFileNames: "[ext]/[name]-[hash].[ext]",
          manualChunks: {
            // vue vue-router合并打包
            "element-plus": ["element-plus"],
            vue: ["vue", "vue-router"],
          },
        },
      },
    },
    server: {
      host: "0.0.0.0", // ip
      port: 8080, // 端口号
      open: false, // 是否自动在浏览器打开
      // 跨域代理配置
    },
  };
});
