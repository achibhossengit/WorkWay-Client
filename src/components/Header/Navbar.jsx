import { useContext, useMemo } from "react";
import {
  FaHome,
  FaBriefcase,
  FaSignInAlt,
  FaUserPlus,
  FaUserTie,
  FaStar,
} from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../context/authContext";
import WorkWayLogo from "../Brand/WorkWayLogo";

const baseLinks = [
  { title: "Home", path: "/", icon: <FaHome />, end: true },
  { title: "Jobs", path: "/jobs", icon: <FaBriefcase /> },
];

const displayName = (user) => {
  const fullName = [user?.first_name, user?.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();
  return fullName || user?.username || "User";
};

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200 ${
    isActive
      ? "bg-blue-50 font-medium text-blue-600 shadow-sm"
      : "text-gray-600 hover:bg-gray-100"
  }`;

const Navbar = () => {
  const { user, loading } = useContext(AuthContext);

  const roleLinks = useMemo(() => {
    if (!user) return [];
    if (user.user_type === "Employer") {
      return [
        {
          title: "Posted Jobs",
          path: "/dashboard/posted-jobs",
          icon: <FaBriefcase />,
        },
        {
          title: "Applications",
          path: "/dashboard/applications",
          icon: <FaUserTie />,
        },
      ];
    }
    return [
      {
        title: "My Applications",
        path: "/dashboard/applications",
        icon: <FaUserTie />,
      },
      {
        title: "Reviews",
        path: "/dashboard/reviews",
        icon: <FaStar />,
      },
    ];
  }, [user]);

  const navLinks = [...baseLinks, ...roleLinks];

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content z-1 mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink to={link.path} end={link.end} className={navLinkClass}>
                  {link.icon} {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <WorkWayLogo />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} end={link.end} className={navLinkClass}>
                {link.icon} {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        {loading ? (
          <div className="skeleton h-10 w-28 shrink-0 rounded-full"></div>
        ) : user ? (
          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-full py-1 pl-3 pr-1 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md"
            title="Go to dashboard"
          >
            <span className="max-w-[8rem] truncate text-sm font-medium text-gray-800 sm:max-w-[12rem]">
              {displayName(user)}
            </span>
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <img
                alt=""
                src={
                  user.profile_picture
                    ? user.profile_picture
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                className="h-full w-full object-cover"
              />
            </div>
          </Link>
        ) : (
          <div className="flex gap-4">
            <NavLink
              to="/register"
              className="btn ui-btn-lift flex items-center rounded-lg border border-blue-600 bg-white px-4 py-2 font-medium text-blue-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FaUserPlus className="mr-2" />
              Sign Up
            </NavLink>
            <NavLink
              to="/login"
              className="btn btn-primary ui-btn-lift flex items-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FaSignInAlt className="mr-2" />
              Sign In
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
