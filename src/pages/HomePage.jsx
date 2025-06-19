import FilterSection from "../components/Home/FilterSection";
import HotJobSection from "../components/Home/HotJobSection";
import ServicesSection from "../components/Jobs/ServicesSection";
import ReviewsSection from "../components/Jobs/ReviewsSection";
import FAQSection from "../components/Jobs/FaqSection";

const HomePage = () => {
  return (
    <div>
      <FilterSection/>
      <HotJobSection/>
      <ServicesSection/>
      <ReviewsSection/>
      <FAQSection/>
    </div>
  );
};

export default HomePage;
