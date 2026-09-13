import { Link } from "react-router";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
} from "react-icons/fa";
import { formatSalary, getJobType } from "../Utilities/UtilityFunctions";

const JobCard = ({ job }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start gap-3">
        <div className="rounded-lg bg-blue-100 p-3">
          <FaBuilding className="text-xl text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
          <p className="text-gray-600">
            {job.employer?.company || job.employer?.username}
          </p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-700">
          <FaBriefcase className="text-gray-400" />
          <span>{getJobType(job.details?.status || "Full-time")}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <FaMapMarkerAlt className="text-gray-400" />
          <span>{job.details?.locations || "Location not specified"}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <FaMoneyBillWave className="text-gray-400" />
          <span>{formatSalary(job.details?.min_salary)}</span>
        </div>
      </div>

      <Link
        to={`/jobs/${job.id}`}
        className="mt-4 block w-full rounded-md bg-blue-600 py-2 text-center text-white transition-colors hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
