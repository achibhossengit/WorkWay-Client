import { Link } from "react-router";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  formatDate,
  formatSalary,
  getJobType,
  isDeadlinePassed,
} from "../Utilities/UtilityFunctions";

const JobCard = ({ job, hasApplied = false }) => {
  const company =
    job.employer?.company || job.employer?.username || "Unknown company";
  const closed = isDeadlinePassed(job.details?.deadline);

  return (
    <Link
      to={`/jobs/${job.id}`}
      className="ui-card-lift flex h-full flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
      aria-label={`View details for ${job.title}`}
    >
      <div className="mb-4 flex items-start gap-3">
        <div className="shrink-0 rounded-lg bg-blue-100 p-3">
          <FaBuilding className="text-xl text-blue-600" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
          <p className="font-medium text-gray-700">{company}</p>
        </div>
      </div>

      <div className="flex-1 space-y-2 text-sm">
        <div className="flex flex-wrap gap-2">
          {job.is_featured && (
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
              Featured
            </span>
          )}
          {hasApplied && (
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Applied
            </span>
          )}
          {!hasApplied && closed && (
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              Deadline passed
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <FaCalendarAlt className="shrink-0 text-gray-400" />
          <span>
            Posted {job.published_at ? formatDate(job.published_at) : "—"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <FaBriefcase className="shrink-0 text-gray-400" />
          <span>{getJobType(job.details?.status || "Full-time")}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <FaMapMarkerAlt className="shrink-0 text-gray-400" />
          <span>{job.details?.locations || "Location not specified"}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <FaMoneyBillWave className="shrink-0 text-gray-400" />
          <span>{formatSalary(job.details?.min_salary)}</span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
