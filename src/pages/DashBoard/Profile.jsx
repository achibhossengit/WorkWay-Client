import { useContext } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaUserTie,
  FaBuilding,
} from "react-icons/fa";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {user && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden xl:col-span-1 flex flex-col items-center p-6 border border-gray-200">
            {/* Profile Image */}
            <div className="relative mb-4">
              <img
                src={user.profile_picture || "/placeholder.png"}
                alt="Profile"
                className="h-32 w-32 rounded-full border-4 border-blue-500 object-cover"
              />
              <div className="absolute -bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full">
                {user.user_type === "Jobseeker" ? (
                  <FaUserTie size={16} />
                ) : (
                  <FaBuilding size={16} />
                )}
              </div>
            </div>

            {/* User Name */}
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              {user.first_name || user.last_name
                ? user.first_name + " " + user.last_name
                : "Not Found"}
            </h2>

            {/* User Role */}
            <p className="text-blue-600 font-medium mb-4">
              {user.user_type === "Employer"
                ? user.employer?.company || "Not found"
                : `${user.jobseeker?.gender || "Not found"} • ${
                    user.jobseeker?.experiences || 0
                  } yrs exp`}
            </p>

            {/* Contact Information */}
            <div className="space-y-3 w-full mb-4">
              <div className="flex items-center">
                <FaEnvelope className="text-blue-400 mr-3" size={14} />
                <span className="text-gray-700 text-sm">
                  {user.email || "Not found"}
                </span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-blue-400 mr-3" size={14} />
                <span className="text-gray-700 text-sm">
                  {user.contact_number || "Not found"}
                </span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-blue-400 mr-3" size={14} />
                <span className="text-gray-700 text-sm">
                  {user.user_type === "Employer"
                    ? user.employer?.location || "Not found"
                    : user.jobseeker?.current_address || "Not found"}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button className="mt-2 w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
              <FaEdit className="mr-2" size={14} />
              Edit Profile
            </button>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300 flex items-center">
                <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
                  {user.user_type === "Jobseeker" ? (
                    <FaUserTie size={16} />
                  ) : (
                    <FaBuilding size={16} />
                  )}
                </span>
                {user.user_type === "Jobseeker"
                  ? "About Me"
                  : "Company Overview"}
              </h3>
              <p className="text-gray-700">
                {user.user_type === "Jobseeker"
                  ? user.jobseeker?.about || "Not found"
                  : user.employer?.description || "Not found"}
              </p>
            </div>

            {/* Conditional Sections */}
            {user.user_type === "Jobseeker" ? (
              <>
                {/* Skills Section */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">
                    Skills & Expertise
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {user.jobseeker?.skills?.length > 0 ? (
                      user.jobseeker.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">Not found</p>
                    )}
                  </div>
                </div>

                {/* Resume Section */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">
                    Resume
                  </h3>
                  <div className="flex items-center gap-4">
                    {user.jobseeker?.resume ? (
                      <a
                        href={user.jobseeker.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium"
                      >
                        View Resume
                      </a>
                    ) : (
                      <p className="text-gray-500 text-sm">Not found</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Employer Details */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">
                    Company Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">
                        Company Name
                      </h4>
                      <p className="text-gray-900">
                        {user.employer?.company || "Not found"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">
                        Location
                      </h4>
                      <p className="text-gray-900">
                        {user.employer?.location || "Not found"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">
                        Website
                      </h4>
                      <a
                        href={
                          user.employer?.website
                            ? `https://${user.employer.website}`
                            : "#"
                        }
                        className={`${
                          user.employer?.website
                            ? "text-blue-500 hover:underline"
                            : "text-gray-500 cursor-not-allowed"
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.employer?.website || "Not found"}
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
