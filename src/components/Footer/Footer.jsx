import { Link } from "react-router";
import { FaBriefcase, FaEnvelope } from "react-icons/fa";
import WorkWayLogo from "../Brand/WorkWayLogo";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-slate-100 text-slate-700">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-3 md:col-span-2 lg:col-span-1">
          <WorkWayLogo />
          <p className="max-w-xs text-sm leading-relaxed text-slate-600">
            A job board that connects job seekers with employers — browse roles,
            apply with your resume, and manage hiring in one place.
          </p>
        </div>

        <nav className="space-y-3">
          <h6 className="text-sm font-semibold uppercase tracking-wide text-slate-800">
            Explore
          </h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-blue-600">
                Browse jobs
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-blue-600">
                About us
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="space-y-3">
          <h6 className="text-sm font-semibold uppercase tracking-wide text-slate-800">
            Job seekers
          </h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/register" className="hover:text-blue-600">
                Create account
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-blue-600">
                Find jobs
              </Link>
            </li>
            <li>
              <Link to="/dashboard/applications" className="hover:text-blue-600">
                My applications
              </Link>
            </li>
            <li>
              <Link to="/dashboard/reviews" className="hover:text-blue-600">
                Leave a review
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="space-y-3">
          <h6 className="text-sm font-semibold uppercase tracking-wide text-slate-800">
            Employers
          </h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/register" className="hover:text-blue-600">
                Hire on WorkWay
              </Link>
            </li>
            <li>
              <Link to="/dashboard/posted-jobs" className="hover:text-blue-600">
                Posted jobs
              </Link>
            </li>
            <li>
              <Link to="/dashboard/applications" className="hover:text-blue-600">
                Review applications
              </Link>
            </li>
            <li>
              <Link to="/dashboard/posted-jobs?create=1" className="hover:text-blue-600">
                Post a job
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>© {year} WorkWay. Find work. Hire talent.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <FaBriefcase className="text-blue-600" />
              Job board for seekers & employers
            </span>
            <a
              href="mailto:support@workway.local"
              className="inline-flex items-center gap-2 hover:text-blue-600"
            >
              <FaEnvelope />
              support@workway.local
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
