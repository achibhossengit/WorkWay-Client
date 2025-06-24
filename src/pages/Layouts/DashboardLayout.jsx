import { Outlet, useLocation, Link } from "react-router";
import {
  FaHome,
  FaUserTie,
  FaBriefcase,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    <div className="flex relative min-h-[90vh] bg-gray-50">
      {/* Mobile sidebar toggle */}
      <button
        className={`md:hidden absolute h-10 w-14 flex items-center justify-center rounded-r-lg bg-gray-200 ${
          sidebarOpen ? "-translate-x-full" : "translate-x-0"
        } transform transition-transform duration-400 ease-in-out z-50 px-1 text-blue-500 text-2xl`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <MdArrowBackIos /> : <MdArrowForwardIos />}
      </button>

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transform transition-transform duration-400 ease-in-out
        absolute md:static w-64 min-h-full bg-white shadow-sm z-40`}
      >
        <nav>
          <ul className="mt-8 space-y-2 px-4">
            {navItems.map((item) => (
              <li key={item.title}>
                <Link
                  to={item.link}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors
                    ${
                      currentPath === item.link || (currentPath === 'dashboard' && item.link=='')
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

      {/* Main content */}
      <div
        onClick={() => setSidebarOpen(false)}
        className="flex-1 overflow-auto"
      >
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
