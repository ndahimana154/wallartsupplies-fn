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
    // More aggressive code-splitting: group large libraries and allow automatic vendor splitting
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react'
            }
            if (id.includes('recharts') || id.includes('d3')) {
              return 'vendor-charts'
            }
            if (id.includes('framer-motion') || id.includes('react-icons') || id.includes('lucide-react')) {
              return 'vendor-ui'
            }
            if (id.includes('formik') || id.includes('yup')) {
              return 'vendor-form'
            }
            if (id.includes('axios') || id.includes('web-vitals')) {
              return 'vendor-api'
            }
            if (id.includes('quill') || id.includes('react-quill') || id.includes('tiptap')) {
              return 'vendor-editor'
            }
            return 'vendor-others'
          }
        },
      },
    },
    // Optimize chunk size threshold and minify with esbuild
    chunkSizeWarningLimit: 600,
    minify: 'esbuild',
    // Enable brotli size reporting
    reportCompressedSize: true,
    // Faster build with parallel optimization
    cssCodeSplit: true,
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-redux', '@reduxjs/toolkit', 'recharts', 'framer-motion', 'react-icons', 'lucide-react', 'axios', 'react-hot-toast'],
  },
})
