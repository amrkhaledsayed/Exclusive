import BestSelling from "../common/BestSelling";
import Category from "../common/Category";
import Footer from "../common/Footer";
import Header from "../common/Header";
import HeroSection from "../common/HeroSection";
import NewArrival from "../common/NewArrival";
import OurProducts from "../common/OurProducts";
import ProductToday from "../common/ProductToday";
import ServesSection from "../common/ServesSection";
import SpecialOffers from "../common/Specialoffers";

const Home = () => {
  return (
    <>
      <HeroSection />
      <ProductToday />
      <Category />
      <BestSelling />
      <SpecialOffers />
      <OurProducts />
      <NewArrival />
      <ServesSection />
    </>
  );
};
export default Home;
