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
    searchCategory,
    keywordInput,
    handleCurrentPage,
    handleCategoryChange,
    handleKeywordChange,
  } = useJobsCategories();

  return (
    <div className="bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <Filter
          categories={categories}
          keyword={keywordInput}
          category={searchCategory}
          onKeywordChange={handleKeywordChange}
          onCategoryChange={handleCategoryChange}
        />
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
                className={`join-item btn btn-sm ui-btn-lift rounded-sm ${
                  currentPage === n + 1
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-blue-100 text-blue-600 hover:bg-blue-200"
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
