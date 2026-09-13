import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import apiClient from "../../services/ApiClient";
import Spinner from "../../components/Utilities/Spinner";
import Pagination from "../../components/Utilities/Pagination";
import useClientPagination from "../../hooks/useClientPagination";
import { formatDate } from "../../components/Utilities/UtilityFunctions";
import {
  STATUS_LABELS,
  STATUS_STYLES,
  applicantName,
} from "../../components/Applications/applicationStatus";

const JobApplications = () => {
  const { jobId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentPage, totalPage, pageItems, handlePageChange } =
    useClientPagination(applications, 10);

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const [jobRes, appRes] = await Promise.all([
          apiClient.get(`jobs/${jobId}/`),
          apiClient.get(`employers/${user.id}/jobs/${jobId}/applications/`),
        ]);
        if (
          user.username &&
          jobRes.data.employer?.username &&
          jobRes.data.employer.username !== user.username
        ) {
          toast.error("You can only review applications for your own jobs.");
          navigate("/dashboard/posted-jobs");
          return;
        }
        setJob(jobRes.data);
        setApplications(
          Array.isArray(appRes.data) ? appRes.data : appRes.data.results || []
        );
      } catch {
        toast.error("Could not load applications.");
        navigate("/dashboard/posted-jobs");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [jobId, user?.id, user?.username, navigate]);

  if (loading) return <Spinner title="Loading applications..." />;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <Link
        to={`/dashboard/posted-jobs/${jobId}`}
        className="mb-4 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        ← Back to job
      </Link>
      <h1 className="mb-1 text-2xl font-bold text-gray-800">Applications</h1>
      <p className="mb-6 text-sm text-gray-500">
        {job?.title || "Job"} • {applications.length} applicant
        {applications.length === 1 ? "" : "s"}
      </p>

      {applications.length === 0 ? (
        <p className="text-gray-500">No applications yet for this job.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-slate-500">
                  <th className="pb-3 font-medium">Applicant</th>
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
                    onClick={() =>
                      navigate(
                        `/dashboard/posted-jobs/${jobId}/applications/${application.id}`
                      )
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        navigate(
                          `/dashboard/posted-jobs/${jobId}/applications/${application.id}`
                        );
                      }
                    }}
                    className="cursor-pointer border-b border-gray-100 last:border-0 transition-colors hover:bg-slate-50"
                  >
                    <td className="py-4 font-medium text-gray-800">
                      {applicantName(application.applicant)}
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

export default JobApplications;
