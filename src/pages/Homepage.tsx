import FramesList from '../components/FramesList';
import Hero from '../components/Hero';
import HomeBestCategories from '../components/HomeBestCategories';
import SeoSetup from '../components/SeoSetup';
import Testimonials from '../components/Testimonials';

const Homepage = () => {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50">
      <SeoSetup mainData={{ title: 'Home ' }} />
      <Hero />
      <HomeBestCategories />
      <FramesList />
      <Testimonials />
    </div>
  );
};

export default Homepage;
