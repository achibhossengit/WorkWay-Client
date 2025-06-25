import {
  FaHome,
  FaUserTie,
  FaBriefcase,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link, useLocation } from "react-router";

const Sidebar = () => {
  const location = useLocation();

  const currentPath = location.pathname.split("/").pop();

  // Sidebar navigation items
  const navItems = [
    { title: "Dashboard", link: "", icon: <FaHome /> },
    { title: "Profile", link: "profile", icon: <FaUser /> },
    { title: "Posted Jobs", link: "posted-jobs", icon: <FaBriefcase /> },
    { title: "Applications", link: "applications", icon: <FaUserTie /> },
    { title: "Analytics", link: "analytics", icon: <FaChartLine /> },
  ];
  return (
    <div>
      <nav>
        <ul className="mt-8 space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.title}>
              <Link
                to={item.link}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors
                    ${
                      currentPath === item.link ||
                      (currentPath === "dashboard" && item.link == "")
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <button className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
          <FaSignOutAlt className="mr-3 text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
