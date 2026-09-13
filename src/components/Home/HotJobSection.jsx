import { Link } from "react-router";
import JobsContainer from "../Jobs/JobsContainer";
import Spinner from "../Utilities/Spinner";

const HotJobSection = ({ jobs, loading }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-gray-800">HOT JOBS</h2>
        <Link
          to="/jobs"
          className="ui-btn-lift shrink-0 rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
        >
          Show all
        </Link>
      </div>
      {loading ? (
        <Spinner
          title="Loading Jobs"
          description="Fetching the latest opportunities for you..."
        />
      ) : (
        <JobsContainer jobs={jobs} />
      )}
    </div>
  );
};

export default HotJobSection;
