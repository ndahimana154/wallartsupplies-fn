import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import AppRouter from './routes';
import ScrollToTop from './components/ScrollTop';
import { initializeOptimizations } from './utils/performanceOptimization';
import { store } from './redux/store';

const App = () => {
  useEffect(() => {
    // Initialize performance optimizations
    initializeOptimizations();
  }, []);

  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppRouter />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
};

export default App;
