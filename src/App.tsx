import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import AppRouter from './routes';
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
        <ScrollToTop />
        <AppRouter />
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
