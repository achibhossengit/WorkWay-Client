import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import apiClient from "../../services/ApiClient";
import Spinner from "../../components/Utilities/Spinner";
import Pagination from "../../components/Utilities/Pagination";
import PostJobModal from "../../components/Jobs/PostJobModal";
import useServerPagination, {
  countFrom,
} from "../../hooks/useServerPagination";
import {
  formatDate,
  getJobType,
} from "../../components/Utilities/UtilityFunctions";

const PostedJobs = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(
    searchParams.get("create") === "1"
  );
  const { currentPage, totalPage, applyPageData, handlePageChange, resetPage } =
    useServerPagination();

  useEffect(() => {
    if (searchParams.get("create") === "1") {
      setIsCreateOpen(true);
      searchParams.delete("create");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const loadJobs = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const res = await apiClient.get(
          `employers/${user.id}/jobs/?page=${currentPage}`
        );
        setJobs(applyPageData(res.data));
        setTotalCount(countFrom(res.data));
      } catch {
        toast.error("Could not load your posted jobs.");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [user?.id, currentPage, applyPageData]);

  const handleCreated = () => {
    setIsCreateOpen(false);
    if (currentPage === 1) {
      apiClient
        .get(`employers/${user.id}/jobs/?page=1`)
        .then((res) => {
          setJobs(applyPageData(res.data));
          setTotalCount(countFrom(res.data));
        })
        .catch(() => {});
    } else {
      resetPage();
    }
  };

  if (loading) return <Spinner title="Loading posted jobs..." />;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Posted Jobs</h1>
        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="ui-btn-lift rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Post Job
        </button>
      </div>

      {totalCount === 0 ? (
        <p className="text-gray-500">
          You have not posted any jobs yet.{" "}
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="text-blue-600 hover:underline"
          >
            Publish your first job
          </button>
          .
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-slate-500">
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Published</th>
                  <th className="pb-3 font-medium">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/dashboard/posted-jobs/${job.id}`)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        navigate(`/dashboard/posted-jobs/${job.id}`);
                      }
                    }}
                    className="cursor-pointer border-b border-gray-100 last:border-0 transition-colors hover:bg-slate-50"
                  >
                    <td className="py-4 font-medium text-gray-800">{job.title}</td>
                    <td className="py-4 text-slate-600">
                      {job.category?.title || "—"}
                    </td>
                    <td className="py-4 text-slate-600">
                      {getJobType(job.details?.status)}
                    </td>
                    <td className="py-4 text-slate-600">
                      {formatDate(job.published_at)}
                    </td>
                    <td className="py-4 text-slate-600">
                      {job.details?.deadline
                        ? formatDate(job.details.deadline)
                        : "—"}
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
            disabled={loading}
          />
        </>
      )}

      {isCreateOpen && (
        <PostJobModal
          onClose={() => setIsCreateOpen(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
};

export default PostedJobs;
