import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
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

const EmployerApplications = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentPage, totalPage, pageItems, handlePageChange } =
    useClientPagination(applications, 10);

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const jobsRes = await apiClient.get(`employers/${user.id}/jobs/`);
        const jobs = Array.isArray(jobsRes.data)
          ? jobsRes.data
          : jobsRes.data.results || [];

        const groups = await Promise.all(
          jobs.map(async (job) => {
            const res = await apiClient.get(
              `employers/${user.id}/jobs/${job.id}/applications/`
            );
            const items = Array.isArray(res.data)
              ? res.data
              : res.data.results || [];
            return items.map((application) => ({
              ...application,
              job_title: application.job_title || job.title,
              job: application.job || job.id,
            }));
          })
        );
        setApplications(groups.flat());
      } catch {
        toast.error("Could not load applications.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user?.id]);

  if (loading) return <Spinner title="Loading applications..." />;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Applications</h1>

      {applications.length === 0 ? (
        <p className="text-gray-500">
          No applications yet. Applicants will appear here after they apply to
          your jobs.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-slate-500">
                  <th className="pb-3 font-medium">Job</th>
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
                        `/dashboard/posted-jobs/${application.job}/applications/${application.id}`
                      )
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        navigate(
                          `/dashboard/posted-jobs/${application.job}/applications/${application.id}`
                        );
                      }
                    }}
                    className="cursor-pointer border-b border-gray-100 last:border-0 transition-colors hover:bg-slate-50"
                  >
                    <td className="py-4 font-medium text-gray-800">
                      {application.job_title || `Job #${application.job}`}
                    </td>
                    <td className="py-4 text-gray-800">
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

export default EmployerApplications;
