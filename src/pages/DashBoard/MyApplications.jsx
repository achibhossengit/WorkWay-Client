import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import apiClient from "../../services/ApiClient";
import Spinner from "../../components/Utilities/Spinner";
import Pagination from "../../components/Utilities/Pagination";
import useClientPagination from "../../hooks/useClientPagination";
import { formatDate } from "../../components/Utilities/UtilityFunctions";

const STATUS_LABELS = {
  P: "Pending",
  R: "Reviewed",
  A: "Accept",
  X: "Rejected",
  C: "Cancelled",
};

const STATUS_STYLES = {
  P: "bg-amber-100 text-amber-800",
  R: "bg-blue-100 text-blue-800",
  A: "bg-green-100 text-green-800",
  X: "bg-rose-100 text-rose-800",
  C: "bg-slate-100 text-slate-600",
};

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentPage, totalPage, pageItems, handlePageChange } =
    useClientPagination(applications, 10);

  useEffect(() => {
    const loadApplications = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const res = await apiClient.get(`jobseekers/${user.id}/applications/`);
        setApplications(
          Array.isArray(res.data) ? res.data : res.data.results || []
        );
      } catch {
        toast.error("Could not load your applications.");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [user?.id]);

  if (loading) return <Spinner title="Loading applications..." />;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">My Applications</h1>

      {applications.length === 0 ? (
        <p className="text-gray-500">You have not applied to any jobs yet.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-slate-500">
                  <th className="pb-3 font-medium">Job title</th>
                  <th className="pb-3 font-medium">Applied on</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((application) => (
                  <tr
                    key={application.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/jobs/${application.job}`)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        navigate(`/jobs/${application.job}`);
                      }
                    }}
                    className="cursor-pointer border-b border-gray-100 last:border-0 transition-colors hover:bg-slate-50"
                  >
                    <td className="py-4 font-medium text-gray-800">
                      {application.job_title || `Job #${application.job}`}
                    </td>
                    <td className="py-4 text-slate-600">
                      {formatDate(application.applied_at)}
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          STATUS_STYLES[application.status] ||
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {STATUS_LABELS[application.status] || application.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default MyApplications;
