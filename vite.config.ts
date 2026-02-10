import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss()
  ],
  build: {
    // Code splitting for better caching and performance
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-libs': ['framer-motion', 'react-icons', 'lucide-react'],
          'form': ['formik', 'yup'],
          'api': ['axios'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable minification (default esbuild is faster)
    minify: 'esbuild',
  },
})
