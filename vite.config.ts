import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";

export default defineConfig({
  base: "/kyawzawwin.dev/",
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app'), 
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    outDir: 'build/client', 
  },
  preview: {
    port: 3003,
    host: '0.0.0.0',
  },
  plugins: [
    remix({
      ssr: false,
    }),
    viteStaticCopy({
      targets: [
        {
          src: [
            "./data/*",
            "!**/.DS_Store",
          ],
          dest: "../client"
        },
      ],
    })
  ],
});
