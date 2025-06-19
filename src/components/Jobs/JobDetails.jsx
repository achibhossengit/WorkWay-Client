import React from "react";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaGraduationCap,
  FaStar,
} from "react-icons/fa";

// Job Card Component
const JobDetails = ({ job }) => {
  // Helper functions
  const getWorkplace = (code) => {
    switch (code) {
      case "R":
        return "Remote";
      case "H":
        return "Hybrid";
      case "O":
        return "On-site";
      default:
        return "Not specified";
    }
  };

  const getJobType = (code) => {
    switch (code) {
      case "F":
        return "Full-time";
      case "P":
        return "Part-time";
      default:
        return "Not specified";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
            <p className="text-gray-600">{job.employer}</p>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {job.category === 2
              ? "Tech"
              : job.category === 3
              ? "Analytics"
              : job.category === 4
              ? "Engineering"
              : job.category === 5
              ? "Design"
              : job.category === 6
              ? "Marketing"
              : "General"}
          </span>
        </div>

        <p className="mt-4 text-gray-700">{job.details.description}</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center text-gray-600">
            <FaBriefcase className="mr-2 text-blue-500" />
            <span>{getJobType(job.details.status)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2 text-blue-500" />
            <span>
              {getWorkplace(job.details.workplace)} • {job.details.locations}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaMoneyBillWave className="mr-2 text-blue-500" />
            <span>৳{job.details.min_salary.toLocaleString()}/month</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="mr-2 text-blue-500" />
            <span>Apply by {formatDate(job.details.deadline)}</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
              <FaGraduationCap className="mr-1 text-blue-500" />
              {job.requirements.education}
            </span>
            <span className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
              <FaStar className="mr-1 text-blue-500" />
              {job.requirements.experience}+ years experience
            </span>
            {job.requirements.skill.split(", ").map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Posted on {formatDate(job.published_at)}
          </span>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
