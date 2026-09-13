import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaGraduationCap,
} from "react-icons/fa";
import {
  formatDate,
  formatSalary,
  getJobType,
  getWorkplace,
} from "../Utilities/UtilityFunctions";

const STATUS_LABELS = {
  P: "Pending",
  R: "Reviewed",
  A: "Accept",
  C: "Cancelled",
};

const JobDetailsView = ({ job, application }) => {
  return (
    <>
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-gray-900">{job.title}</h1>
          <p className="font-medium text-gray-700">
            {job.employer?.company || "Unknown Company"}
          </p>
          <p className="text-sm text-gray-500">
            Posted by {job.employer?.username} • {formatDate(job.published_at)}
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <span className="badge badge-primary">{job.category?.title}</span>
          <div className="badge badge-outline">
            {getJobType(job.details?.status)}
          </div>
          {application && (
            <span className="badge badge-ghost">
              {STATUS_LABELS[application.status] || application.status}
              {application.applied_at
                ? ` • ${formatDate(application.applied_at)}`
                : ""}
            </span>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-gray-800">
          Job Description
        </h2>
        <p className="leading-relaxed text-gray-700">
          {job.details?.description || "No description provided."}
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 rounded-lg bg-gray-50 p-4 md:grid-cols-2">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-100 p-2 text-blue-600">
            <FaMapMarkerAlt className="text-lg" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium">
              {getWorkplace(job.details?.workplace)} •{" "}
              {job.details?.locations || "Not specified"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-100 p-2 text-blue-600">
            <FaMoneyBillWave className="text-lg" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Salary</p>
            <p className="font-medium">
              {formatSalary(job.details?.min_salary)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-100 p-2 text-blue-600">
            <FaCalendarAlt className="text-lg" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Deadline</p>
            <p className="font-medium">
              {job.details?.deadline
                ? formatDate(job.details.deadline)
                : "Not specified"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-100 p-2 text-blue-600">
            <FaBriefcase className="text-lg" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Experience</p>
            <p className="font-medium">
              {job.requirements?.experience != null
                ? `${job.requirements.experience}+ years`
                : "Not specified"}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-800">
          Requirements
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FaGraduationCap className="text-blue-500" />
            <span className="text-gray-700">
              {job.requirements?.education || "Not specified"}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(job.requirements?.skill || "")
              .split(", ")
              .filter(Boolean)
              .map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-outline rounded-lg px-3 py-2"
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailsView;
