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

const JobDetailsModal = ({ job, setIsModalOpen }) => {
  return (
    <dialog
      open
      className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
    >
      <div className="modal-box max-w-4xl p-0 overflow-hidden">
        <div className="p-8">
          {/* Job Title and Company */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {job.title}
              </h3>
              <p className="text-gray-700 font-medium">
                {job.employer.company || "Unknown Company"}
              </p>
              <p className="text-gray-500 text-sm">
                Posted by {job.employer.username} •{" "}
                {formatDate(job.published_at)}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="badge badge-primary">{job.category.title}</span>
              <div className="badge badge-outline">
                {getJobType(job.details?.status)}
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Job Description
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {job.details?.description || "No description provided."}
            </p>
          </div>

          {/* Key Details Grid */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <FaMapMarkerAlt className="text-lg" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">
                  {getWorkplace(job.details?.workplace)} •{" "}
                  {job.details?.locations}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
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
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <FaCalendarAlt className="text-lg" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Deadline</p>
                <p className="font-medium">
                  {formatDate(job.details?.deadline)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <FaBriefcase className="text-lg" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-medium">
                  {job.requirements.experience}+ years
                </p>
              </div>
            </div>
          </div>

          {/* Requirements Section */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Requirements
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FaGraduationCap className="text-blue-500" />
                <span className="text-gray-700">
                  {job.requirements.education}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {job.requirements.skill.split(", ").map((skill, index) => (
                  <span
                    key={index}
                    className="badge badge-outline py-2 px-3 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-outline px-6 hover:bg-gray-100"
            >
              Close
            </button>
            <button className="btn btn-primary px-6 bg-blue-600 hover:bg-blue-700 text-white">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default JobDetailsModal;
