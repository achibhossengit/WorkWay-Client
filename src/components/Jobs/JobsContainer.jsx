import JobCard from "./JobCard";

const JobsContainer = ({ jobs }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">HOT JOBS</h2>
      <p className="text-gray-600 mb-8">
        Browse the latest job opportunities from top employers
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
          Load More Jobs
        </button>
      </div>
    </div>
  );
};
export default JobsContainer;
