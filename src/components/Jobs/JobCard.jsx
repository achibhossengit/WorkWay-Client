import React from "react";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
} from "react-icons/fa";

const JobCard = ({ job }) => {
  // Helper functions
  const getJobType = (code) => {
    switch (code) {
      case "F":
        return "Full-time";
      case "P":
        return "Part-time";
      default:
        return code;
    }
  };

  const formatSalary = (amount) => {
    return amount ? `৳${amount.toLocaleString()}/month` : "Salary negotiable";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-5">
      <div className="flex items-start gap-3 mb-3">
        <div className="bg-blue-100 p-3 rounded-lg">
          <FaBuilding className="text-blue-600 text-xl" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-800">{job.title}</h3>
          <p className="text-gray-600">{job.employer}</p>
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

      <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
        View Details
      </button>
    </div>
  );
};

export default JobCard;
