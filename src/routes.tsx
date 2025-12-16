import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import VerifyResetLink from './pages/VerifyResetLink';
import Dashboard from './pages/a/Dashboard';
import Layout from './pages/a/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Products from './pages/a/Products';
import Categories from './pages/a/Categories';
import ProductDetail from './pages/ProductDetail';
import ClientsLayout from './pages/ClientsLayout';
import ANotFound from './pages/a/ANotFound';
import CategoriesProducts from './pages/CategoriesProducts';
import HeroAds from './pages/a/HeroAds';
import Search from './pages/Search';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import FAQ from './pages/FAQ';
import ContactUs from './pages/ContactUs';
import Inquiries from './pages/a/Inquiries';
import Logout from './pages/a/Logout';
import Chatbot from './components/Chatbot';
import BestCategories from './pages/Categories';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="" element={<ClientsLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/product-detail/:slug" element={<ProductDetail />} />
        <Route path="/categories/:slug" element={<CategoriesProducts />} />
        <Route path="/categories" element={<BestCategories />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products" element={<Search />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/chat-bot" element={<Chatbot />} />
      </Route>

      <Route path="/a/login" element={<Login />} />
      <Route path="/a/forgot" element={<ForgotPassword />} />
      <Route path="/a/verify-reset" element={<VerifyResetLink />} />

      <Route
        path="a"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="hero-ads" element={<HeroAds />} />
        <Route path="inquiries" element={<Inquiries />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<ANotFound />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
