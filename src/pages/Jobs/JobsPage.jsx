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
    <div className="bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">
              Browse Jobs
            </h1>
            <p className="mt-1 text-sm text-gray-600 sm:text-base">
              Search by title, keyword, or category to find your next role
            </p>
          </div>
          <Filter categories={categories} handleSearch={handleSearch} />
        </div>
        <div>
          {loading ? (
            <Spinner title="Loading jobs.." />
          ) : jobs.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white py-12 text-center text-lg font-semibold text-gray-700">
              No jobs found!
            </div>
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
    </div>
  );
};

export default JobsPage;
