import JobsContainer from "../../components/Jobs/JobsContainer";
import Spinner from "../../components/Utilities/Spinner";
import Filter from "../../components/Filter/Filter";
import useJobsCategories from "../../hooks/useJobsCategories";

const JobsPage = () => {
  const {
    jobs,
    categories,
    loading,
    totalPage,
    currentPage,
    handleCurrentPage,
    handleSearch,
  } = useJobsCategories();

  return (
    <div className="my-10 space-y-10">
      <div>
        <Filter categories={categories} handleSearch={handleSearch}/>
      </div>
      <div>
        {loading ? (
          <Spinner title="Loading jobs.." />
        ) : jobs.length === 0 ? (
          <div className="text-xl font-bold text-center">No jobs found!</div>
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
