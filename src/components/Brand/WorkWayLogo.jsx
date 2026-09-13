import { Link } from "react-router";

const WorkWayLogo = ({ to = "/", className = "" }) => {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 transition-opacity hover:opacity-90 ${className}`}
      aria-label="WorkWay home"
    >
      <img
        src="/workway-logo.png"
        alt=""
        className="h-9 w-9 shrink-0 rounded-lg object-contain"
      />
      <span className="text-xl font-bold tracking-tight text-blue-600">
        WorkWay
      </span>
    </Link>
  );
};

export default WorkWayLogo;
