import {
  FaHome,
  FaUserTie,
  FaBriefcase,
  FaSignOutAlt,
  FaUser,
  FaStar,
} from "react-icons/fa";
import { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { AuthContext } from "../../context/authContext";
import LogoutConfirmPopUp from "../Utilities/LogoutConfirmPopUp";

const jobseekerNav = [
  { title: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { title: "Profile", path: "/dashboard/profile", icon: <FaUser /> },
  { title: "My Applications", path: "/dashboard/applications", icon: <FaUserTie /> },
  { title: "Reviews", path: "/dashboard/reviews", icon: <FaStar /> },
];

const employerNav = [
  { title: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { title: "Profile", path: "/dashboard/profile", icon: <FaUser /> },
  { title: "Posted Jobs", path: "/dashboard/posted-jobs", icon: <FaBriefcase /> },
  { title: "Applications", path: "/dashboard/applications", icon: <FaUserTie /> },
  { title: "Reviews", path: "/dashboard/reviews", icon: <FaStar /> },
];

const isNavActive = (path, pathname) => {
  const onApplicationPage =
    pathname === "/dashboard/applications" ||
    pathname.includes("/applications");

  if (path === "/dashboard/applications") {
    return onApplicationPage;
  }

  if (path === "/dashboard/posted-jobs") {
    return (
      !onApplicationPage &&
      (pathname === "/dashboard/posted-jobs" ||
        pathname.startsWith("/dashboard/posted-jobs/") ||
        pathname.startsWith("/dashboard/post-job/"))
    );
  }

  if (path === "/dashboard") {
    return pathname === "/dashboard";
  }

  return pathname === path || pathname.startsWith(`${path}/`);
};

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const navItems =
    user?.user_type === "Employer" ? employerNav : jobseekerNav;

  return (
    <div>
      <nav>
        <ul className="mt-8 space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/dashboard"}
                className={() =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isNavActive(item.path, pathname)
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => setIsLogoutOpen(true)}
          className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <FaSignOutAlt className="mr-3 text-lg" />
          <span>Logout</span>
        </button>
      </div>

      <LogoutConfirmPopUp
        isOpen={isLogoutOpen}
        onCancel={() => setIsLogoutOpen(false)}
        onConfirm={() => {
          setIsLogoutOpen(false);
          logout();
        }}
      />
    </div>
  );
};

export default Sidebar;
