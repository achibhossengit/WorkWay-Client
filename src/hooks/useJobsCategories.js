import React, { useEffect, useState } from "react";
import apiClient from "../services/ApiClient";

const useJobsCategories = () => {
  const [jobs, setJobs] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get(`jobs/?page=${currentPage}&category=${currentCategory}`);
      if (res) {
        setJobs(res.data.results);
        setTotalPage(Math.ceil(res.data.count / 10));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("categories");
      if (res) {
        setCategories(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const handleSearch =(e)=>{
    e.preventDefault();
    const category = e.target.category.value;
    setCurrentCategory(category)
    console.log(category);
  }

  useEffect(() => {
    fetchJobs();
    fetchCategories();
  }, [currentPage, currentCategory]);

  return {
    jobs,
    categories,
    loading,
    totalPage,
    currentPage,
    fetchJobs,
    fetchCategories,
    handleCurrentPage,
    handleSearch
  };
};

export default useJobsCategories;
