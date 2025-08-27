import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';

  return {
    plugins: [react()],
    
    // Base public path when served in production
    base: '/',
    
    // Build configuration
    build: {
      target: 'esnext',
      outDir: 'dist',
      sourcemap: isDevelopment,
      minify: isProduction ? 'terser' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
            utils: ['clsx', 'tailwind-merge', 'class-variance-authority'],
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
        external: isProduction ? [] : [],
      },
      terserOptions: isProduction ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      } : undefined,
      chunkSizeWarningLimit: 1000,
    },

    // Development server configuration
    server: {
      port: 5173,
      host: true,
      open: true,
      cors: true,
      https: false,
      hmr: {
        overlay: true,
      },
    },

    // Preview server configuration
    preview: {
      port: 4173,
      host: true,
      open: true,
    },

    // Resolve configuration
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@/components': resolve(__dirname, 'src/components'),
        '@/hooks': resolve(__dirname, 'src/hooks'),
        '@/utils': resolve(__dirname, 'src/utils'),
        '@/types': resolve(__dirname, 'src/types'),
        '@/context': resolve(__dirname, 'src/context'),
        '@/data': resolve(__dirname, 'src/data'),
        '@/pages': resolve(__dirname, 'src/pages'),
        '@/assets': resolve(__dirname, 'src/assets'),
        '@/lib': resolve(__dirname, 'src/lib'),
      },
    },

    // CSS configuration
    css: {
      devSourcemap: isDevelopment,
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
    },

    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
        'framer-motion',
        'lucide-react',
      ],
      exclude: ['@radix-ui/react-icons'],
    },

    // Define global constants
    define: {
      __DEV__: isDevelopment,
      __PROD__: isProduction,
      __VERSION__: JSON.stringify(process.env.npm_package_version),
    },

    // Environment variables
    envPrefix: 'VITE_',

    // Performance optimization
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [],
      pure: isProduction ? ['console.log', 'console.info', 'console.debug'] : [],
    },

    // Worker configuration
    worker: {
      format: 'es',
    },

    // Legacy browser support
    legacy: {
      buildSsrCjsExternalHeuristics: true,
    },

    // Experimental features
    experimental: {
      renderBuiltUrl(filename, { hostType }) {
        if (hostType === 'js') {
          return { js: `/${filename}` };
        } else {
          return { relative: true };
        }
      },
    },
  };
});
