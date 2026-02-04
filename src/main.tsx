import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import {
  trackCoreWebVitals,
  prefetchRoutes,
} from './utils/performanceOptimization';

if (typeof window !== 'undefined') {
  trackCoreWebVitals();

  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      prefetchRoutes();
    });
  } else {
    setTimeout(prefetchRoutes, 2000);
  }

  import('web-vitals')
    .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      if (import.meta.env.DEV) {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      }
    })
    .catch(() => {});
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
