import { useEffect, useState } from "react";
import apiClient from "../services/ApiClient";

const SEARCH_DEBOUNCE_MS = 400;

const useJobsCategories = () => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchKeyword(keywordInput.trim());
      setCurrentPage(1);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [keywordInput]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiClient.get("categories");
        setCategories(Array.isArray(res.data) ? res.data : res.data.results || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(currentPage) });
        if (searchCategory) params.set("category", searchCategory);
        if (searchKeyword) params.set("search", searchKeyword);
        const res = await apiClient.get(`jobs/?${params.toString()}`);
        setJobs(res.data.results || []);
        setTotalPage(Math.ceil((res.data.count || 0) / 10));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [currentPage, searchCategory, searchKeyword]);

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category) => {
    setSearchCategory(category);
    setCurrentPage(1);
  };

  const handleKeywordChange = (keyword) => {
    setKeywordInput(keyword);
  };

  return {
    jobs,
    categories,
    loading,
    totalPage,
    currentPage,
    searchCategory,
    keywordInput,
    handleCurrentPage,
    handleCategoryChange,
    handleKeywordChange,
  };
};

export default useJobsCategories;
