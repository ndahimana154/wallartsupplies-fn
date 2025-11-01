import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ProductsDetails from './pages/ProductsDetails';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/frames/:slug" element={<ProductsDetails />} />
    </Routes>
  );
};

export default AppRouter;
