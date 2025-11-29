import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes';
import ScrollToTop from './components/ScrollTop';
const App = () => {
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
