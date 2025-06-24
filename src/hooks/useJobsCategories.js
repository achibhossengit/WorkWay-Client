import React, { useEffect, useState } from "react";
import apiClient from "../services/ApiClient";

const useJobsCategories = () => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get(`jobs/?page=${currentPage}&category=${searchCategory}&search=${searchKeyword}`);
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
    const keyword = e.target.keyword.value;
    setSearchCategory(category)
    setSearchKeyword(keyword)
  }

  useEffect(() => {
    fetchJobs();
    fetchCategories();
  }, [currentPage, searchCategory, searchKeyword]);

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
