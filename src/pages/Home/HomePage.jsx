import FilterSection from "../../components/Home/FilterSection";
import HotJobSection from "../../components/Home/HotJobSection";
import ServicesSection from "../../components/Home/ServicesSection";
import ReviewsSection from "../../components/Home/ReviewsSection";
import FAQSection from "../../components/Home/FAQSection";
import useJobsCategories from "../../hooks/useJobsCategories";

const HomePage = () => {
  const {
    jobs,
    categories,
    loading,
    handleSearch,
  } = useJobsCategories();
  return (
    <div>
      <FilterSection categories={categories} handleSearch={handleSearch}/>
      <HotJobSection jobs={jobs} loading={loading}/>
      <ServicesSection />
      <ReviewsSection />
      <FAQSection />
    </div>
  );
};

export default HomePage;
