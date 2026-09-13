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

  let ctaLabel = "View Details";
  let ctaClass =
    "mt-4 block w-full rounded-md bg-blue-600 py-2 text-center text-white transition-colors hover:bg-blue-700";
  if (!hasApplied && closed) {
    ctaLabel = "Deadline passed";
    ctaClass =
      "mt-4 block w-full rounded-md bg-slate-400 py-2 text-center text-white";
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start gap-3">
        <div className="shrink-0 rounded-lg bg-blue-100 p-3">
          <FaBuilding className="text-xl text-blue-600" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
          <p className="font-medium text-gray-700">{company}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        {hasApplied && (
          <div>
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Applied
            </span>
          </div>
        )}
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

      <Link to={`/jobs/${job.id}`} className={ctaClass}>
        {ctaLabel}
      </Link>
    </div>
  );
};

export default JobCard;
