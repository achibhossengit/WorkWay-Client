import FilterSection from "../components/Home/FilterSection";
import HotJobSection from "../components/Home/HotJobSection";
import ServicesSection from "../components/Home/ServicesSection";
import ReviewsSection from "../components/Home/ReviewsSection";
import FAQSection from "../components/Home/FAQSection";
import { useEffect } from "react";
import useJobsCategories from "../hooks/useJobsCategories";

const HomePage = () => {
  const {
    jobs,
    categories,
    loading,
    fetchJobs,
    fetchCategories,
  } = useJobsCategories();

  useEffect(() => {
    fetchCategories();
    fetchJobs();
  }, []);
  return (
    <div>
      <FilterSection categories={categories} />
      <HotJobSection jobs={jobs} loading={loading}/>
      <ServicesSection />
      <ReviewsSection />
      <FAQSection />
    </div>
  );
};

export default HomePage;
