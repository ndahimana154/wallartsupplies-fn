import FramesList from '../components/FramesList';
import Hero from '../components/Hero';
import HomeBestCategories from '../components/HomeBestCategories';
import Testimonials from '../components/Testimonials';

const Homepage = () => {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50">
      <Hero />
      <HomeBestCategories />
      <FramesList />
      <Testimonials />
    </div>
  );
};

export default Homepage;
