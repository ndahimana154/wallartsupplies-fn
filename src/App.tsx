import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import AppRouter from './routes';
import ErrorBoundary from './components/ErrorBoundary';
import GlobalErrorBanner from './components/GlobalErrorBanner';
import ScrollToTop from './components/ScrollTop';
import { initializeOptimizations } from './utils/performanceOptimization';

const App = () => {
  useEffect(() => {
    // Initialize performance optimizations
    initializeOptimizations();
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <GlobalErrorBanner />
          <ScrollToTop />
          <AppRouter />
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
