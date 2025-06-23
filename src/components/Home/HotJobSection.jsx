import { Link } from "react-router";
import JobsContainer from "../Jobs/JobsContainer";
import Spinner from "../Utilities/Spinner";

const HotJobSection = ({jobs, loading}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">HOT JOBS</h2>
        <p className="text-gray-600 mb-8">
          Browse the latest job opportunities from top employers
        </p>
      </div>
      {loading ? (
        <Spinner
          title={"Loading Jobs"}
          description={"Fetching the latest opportunities for you..."}
        />
      ) : (
        <JobsContainer jobs={jobs}/>
      )}
      <div className="mt-10 text-center">
        <Link to={'/jobs'} className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
          Load More Jobs
        </Link>
      </div>
    </div>
  );
};

export default HotJobSection;
