import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ClientsLayout = () => {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ClientsLayout;
