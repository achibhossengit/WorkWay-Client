import {
  FaHome,
  FaUserTie,
  FaBriefcase,
  FaSignOutAlt,
  FaStar,
  FaCreditCard,
} from "react-icons/fa";
import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AuthContext } from "../../context/authContext";
import LogoutConfirmPopUp from "../Utilities/LogoutConfirmPopUp";
import WorkWayLogo from "../Brand/WorkWayLogo";

const jobseekerNav = [
  { title: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { title: "My Applications", path: "/dashboard/applications", icon: <FaUserTie /> },
  { title: "Reviews", path: "/dashboard/reviews", icon: <FaStar /> },
];

const employerNav = [
  { title: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { title: "Posted Jobs", path: "/dashboard/posted-jobs", icon: <FaBriefcase /> },
  { title: "Applications", path: "/dashboard/applications", icon: <FaUserTie /> },
  { title: "Reviews", path: "/dashboard/reviews", icon: <FaStar /> },
  { title: "Payments", path: "/dashboard/payments", icon: <FaCreditCard /> },
];

const displayName = (user) => {
  const fullName = [user?.first_name, user?.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();
  return fullName || user?.username || "User";
};

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
    <div className="relative flex h-full min-h-screen flex-col">
      <div className="border-b border-gray-200 px-4 py-4">
        <WorkWayLogo />
      </div>

      <Link
        to="/dashboard/profile"
        className={`ui-card-lift mx-4 mt-4 flex items-center gap-3 rounded-xl border p-3 ${
          pathname.startsWith("/dashboard/profile")
            ? "border-blue-200 bg-blue-50 shadow-sm"
            : "border-gray-200 bg-gray-50"
        }`}
      >
        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-slate-200">
          <img
            alt=""
            src={
              user?.profile_picture
                ? user.profile_picture
                : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-800">
            {displayName(user)}
          </p>
          <p className="truncate text-xs text-slate-500">
            {user?.user_type || "Account"} · View profile
          </p>
        </div>
      </Link>

      <nav className="mt-4 flex-1">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/dashboard"}
                className={() =>
                  `flex items-center rounded-lg px-4 py-3 transition-all duration-200 ${
                    isNavActive(item.path, pathname)
                      ? "bg-blue-50 font-medium text-blue-600 shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:shadow-sm"
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

      <div className="border-t border-gray-200 p-4">
        <button
          type="button"
          onClick={() => setIsLogoutOpen(true)}
          className="ui-btn-lift flex w-full items-center rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100"
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
