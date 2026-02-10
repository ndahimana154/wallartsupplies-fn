import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

const Homepage = lazy(() => import('./pages/Homepage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const VerifyResetLink = lazy(() => import('./pages/VerifyResetLink'));
const Dashboard = lazy(() => import('./pages/a/Dashboard'));
const Layout = lazy(() => import('./pages/a/Layout'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const Products = lazy(() => import('./pages/a/Products'));
const Categories = lazy(() => import('./pages/a/Categories'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const ClientsLayout = lazy(() => import('./pages/ClientsLayout'));
const ANotFound = lazy(() => import('./pages/a/ANotFound'));
const CategoriesProducts = lazy(() => import('./pages/CategoriesProducts'));
const HeroAds = lazy(() => import('./pages/a/HeroAds'));
const Search = lazy(() => import('./pages/Search'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const FAQ = lazy(() => import('./pages/FAQ'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Inquiries = lazy(() => import('./pages/a/Inquiries'));
const Logout = lazy(() => import('./pages/a/Logout'));
const Chatbot = lazy(() => import('./components/Chatbot'));
const BestCategories = lazy(() => import('./pages/Categories'));
const Profile = lazy(() => import('./pages/a/Profile'));

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingSpinner text="Loading page..." />}>
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
          <Route path="profile" element={<Profile />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<ANotFound />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
