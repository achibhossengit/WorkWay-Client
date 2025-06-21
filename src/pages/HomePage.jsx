import FilterSection from "../components/Home/FilterSection";
import HotJobSection from "../components/Home/HotJobSection";
import ServicesSection from "../components/Jobs/ServicesSection";
import ReviewsSection from "../components/Jobs/ReviewsSection";
import FAQSection from "../components/Jobs/FaqSection";
import { useEffect, useState } from "react";
import apiClient from "../services/ApiClient";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    apiClient
      .get("categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <FilterSection categories={categories} />
      <HotJobSection />
      <ServicesSection />
      <ReviewsSection />
      <FAQSection />
    </div>
  );
};

export default HomePage;
