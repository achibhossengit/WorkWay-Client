import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import apiClient from "../../services/ApiClient";
import Spinner from "../../components/Utilities/Spinner";
import { countFrom } from "../../hooks/useServerPagination";

const StatCard = ({ label, value, to }) => (
  <Link
    to={to}
    className="ui-card-lift block rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
  >
    <p className="text-sm font-medium text-slate-500">{label}</p>
    <p className="mt-2 text-3xl font-bold text-gray-800">{value}</p>
  </Link>
);

const JobseekerDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const base = `jobseekers/${user.id}/applications`;
        const [totalRes, pendingRes, acceptedRes] = await Promise.all([
          apiClient.get(`${base}/?page_size=1`),
          apiClient.get(`${base}/?status=P&page_size=1`),
          apiClient.get(`${base}/?status=A&page_size=1`),
        ]);
        setStats({
          total: countFrom(totalRes.data),
          pending: countFrom(pendingRes.data),
          accepted: countFrom(acceptedRes.data),
        });
      } catch {
        toast.error("Could not load dashboard summary.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user?.id]);

  if (loading) return <Spinner title="Loading dashboard..." />;

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-gray-800">
        Welcome, {user?.first_name || user?.username || "Job seeker"}
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        A quick look at your applications.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total applications"
          value={stats.total}
          to="/dashboard/applications"
        />
        <StatCard
          label="Pending"
          value={stats.pending}
          to="/dashboard/applications"
        />
        <StatCard
          label="Accepted"
          value={stats.accepted}
          to="/dashboard/applications"
        />
      </div>
    </div>
  );
};

const EmployerDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    jobs: 0,
    newApplications: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const [jobsRes, appsRes] = await Promise.all([
          apiClient.get(`employers/${user.id}/jobs/?page_size=1`),
          apiClient.get(
            `employers/${user.id}/applications/?status=P&page_size=1`
          ),
        ]);
        setStats({
          jobs: countFrom(jobsRes.data),
          newApplications: countFrom(appsRes.data),
        });
      } catch {
        toast.error("Could not load dashboard summary.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user?.id]);

  if (loading) return <Spinner title="Loading dashboard..." />;

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-gray-800">
        Welcome, {user?.first_name || user?.username || "Employer"}
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        A quick look at your hiring activity.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard
          label="Posted jobs"
          value={stats.jobs}
          to="/dashboard/posted-jobs"
        />
        <StatCard
          label="New applications"
          value={stats.newApplications}
          to="/dashboard/applications"
        />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Spinner title="Loading dashboard..." />;

  return user.user_type === "Employer" ? (
    <EmployerDashboard user={user} />
  ) : (
    <JobseekerDashboard user={user} />
  );
};

export default Dashboard;
