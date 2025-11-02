import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ProductsDetails from './pages/ProductsDetails';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import VerifyResetLink from './pages/VerifyResetLink';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/frames/:slug" element={<ProductsDetails />} />

      <Route path="/a/login" element={<Login />} />
      <Route path="/a/forgot" element={<ForgotPassword />} />
      <Route path="/a/verify-reset" element={<VerifyResetLink />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
