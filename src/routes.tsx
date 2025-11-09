import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import VerifyResetLink from './pages/VerifyResetLink';
import Dashboard from './pages/a/Dashboard';
import Layout from './pages/a/Layout';
import Products from './pages/a/Products';
import Categories from './pages/a/Categories';
import ProductDetail from './pages/ProductDetail';
import ClientsLayout from './pages/ClientsLayout';
import ANotFound from './pages/a/ANotFound';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="" element={<ClientsLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/product-detail/:slug" element={<ProductDetail />} />
      </Route>

      <Route path="/a/login" element={<Login />} />
      <Route path="/a/forgot" element={<ForgotPassword />} />
      <Route path="/a/verify-reset" element={<VerifyResetLink />} />

      <Route path="a" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="*" element={<ANotFound />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
