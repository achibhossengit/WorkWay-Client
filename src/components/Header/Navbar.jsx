import {
  FaHome,
  FaBriefcase,
  FaInfoCircle,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { NavLink } from "react-router";

const links = [
  { title: "Home", path: "/", icon: <FaHome /> },
  { title: "Jobs", path: "/jobs", icon: <FaBriefcase /> },
  { title: "About Us", path: "/about-us", icon: <FaInfoCircle /> },
];

const userMenu = [
  { title: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { title: "Profile", path: "/dashboard/profile", icon: <FaUser /> },
  { title: "Logout", path: "/logout", icon: <FaSignOutAlt /> },
];

const Navbar = () => {
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.path} className="flex items-center gap-2">
                  {link.icon} {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <a className="font-bold p-2 text-xl text-blue-600">WorkWay</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.path} className="flex items-center gap-2">
                {link.icon} {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {userMenu.map((item, index) => (
              <li key={index}>
                <a href={item.path} className="flex items-center gap-2">
                  {item.icon} {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-4">
          <NavLink
            to="/register"
            className="flex items-center btn px-4 py-2 rounded-lg font-medium text-blue-600 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:shadow-md border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FaUserPlus className="mr-2" />
            Sign Up
          </NavLink>
          <NavLink
            to="/login"
            className="flex items-center btn btn-primary px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FaSignInAlt className="mr-2" />
            Sign In
          </NavLink>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
