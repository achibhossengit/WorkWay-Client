import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCalendarAlt,
  FaEdit,
} from "react-icons/fa";

const Profile = () => {
  // Sample user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    position: "Senior UI Developer",
    joined: "15 March 2020",
    bio: "Passionate developer with 5+ years of experience in building beautiful and functional user interfaces. Specialized in React and design systems.",
    skills: ["React", "JavaScript", "UI/UX Design", "Tailwind CSS", "Node.js"],
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden lg:col-span-1">
          <div className="bg-blue-600 h-24"></div>
          <div className="px-6 pb-6 relative">
            <div className="flex justify-center -mt-12 mb-4">
              <img
                src={user.avatar}
                alt="Profile"
                className="h-24 w-24 rounded-full border-4 border-white object-cover"
              />
            </div>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">{user.position}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <FaEnvelope className="text-gray-400 mr-3" />
                <span className="text-gray-700">{user.email}</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-gray-400 mr-3" />
                <span className="text-gray-700">{user.phone}</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-gray-400 mr-3" />
                <span className="text-gray-700">{user.location}</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-gray-400 mr-3" />
                <span className="text-gray-700">Joined {user.joined}</span>
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        {/* Details Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden lg:col-span-2 p-6">
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              About
            </h3>
            <p className="text-gray-700">{user.bio}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FaBriefcase className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    Applied for Senior React Developer
                  </p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <FaUser className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Profile updated</p>
                  <p className="text-sm text-gray-500">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
