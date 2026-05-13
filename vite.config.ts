import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    watch: {
      // Skip folders that have nothing to do with the React app but
      // would otherwise churn the watcher (and HMR re-runs) on every
      // unrelated edit. legacy/ holds the pre-Vite vanilla site,
      // dist/ is build output, public/assets/ is static media.
      ignored: [
        '**/legacy/**',
        '**/dist/**',
        '**/public/assets/**',
        '**/.git/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // Force a single copy of React across all dependencies. Without
    // this, Vite occasionally pre-bundles React under two different
    // hashes when a dependency's "use client" directive triggers a
    // separate optimization pass — causing the React-19/Vite "Invalid
    // hook call" / "Cannot read properties of null (reading 'useContext')"
    // crash inside Radix UI hooks (and earlier with framer-motion).
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    // Pre-bundle the Radix primitives we use eagerly so they share the
    // same React copy from the start.
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
      '@radix-ui/react-tabs',
    ],
  },
})
