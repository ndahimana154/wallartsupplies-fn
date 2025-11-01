import Footer from '../components/Footer';
import FramesList from '../components/FramesList';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HomeBestCategories from '../components/HomeBestCategories';
import Testimonials from '../components/Testimonials';

const Homepage = () => {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50">
      <Header />
      <Hero />
      <HomeBestCategories />
      <FramesList />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Homepage;
