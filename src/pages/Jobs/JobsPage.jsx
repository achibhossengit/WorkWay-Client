import { useEffect, useState } from "react";
import apiClient from "../../services/ApiClient";
import JobsContainer from "../../components/Jobs/JobsContainer";
import Spinner from "../../components/Utilities/Spinner";
import Filter from "../../components/Filter/Filter";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([])
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    apiClient.get('categories').then(res=>setCategories(res.data))
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(`jobs/?page=${currentPage}`);
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
    fetchJobs();
  }, [currentPage]);
  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="my-10 space-y-10">
      <div>
        <Filter categories={categories}/>
      </div>
      <div>
        {loading ? (
          <Spinner title="Loading jobs.." />
        ) : (
          <JobsContainer jobs={jobs} />
        )}
      </div>
      <div className="flex justify-center">
        <div className="join space-x-2">
          {[...Array(totalPage).keys()].map((n) => (
            <button
              key={n}
              disabled={loading}
              onClick={() => handleCurrentPage(n + 1)}
              className={`join-item btn btn-sm rounded-sm transition-all duration-200 
          ${
            currentPage === n + 1
              ? "bg-blue-600 text-white shadow-md"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200 hover:shadow-sm"
          }`}
            >
              {n + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
