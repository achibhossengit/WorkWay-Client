import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import apiClient from "../../services/ApiClient";
import Spinner from "../../components/Utilities/Spinner";
import JobDetailsView from "../../components/Jobs/JobDetailsView";
import {
  FEATURED_PRICE_LABEL,
  featuredUntilLabel,
  isJobFeatured,
} from "../../components/Payments/paymentUtils";

const PostedJobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [featuring, setFeaturing] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(`jobs/${jobId}/`);
        if (
          user?.username &&
          res.data.employer?.username &&
          res.data.employer.username !== user.username
        ) {
          toast.error("You can only view your own posted jobs here.");
          navigate("/dashboard/posted-jobs");
          return;
        }
        setJob(res.data);
      } catch {
        toast.error("Could not load this job.");
        navigate("/dashboard/posted-jobs");
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [jobId, user?.username, navigate]);

  const handleFeature = async () => {
    setFeaturing(true);
    try {
      const res = await apiClient.post("payments/init/", { job_id: job.id });
      if (res.data?.gateway_url) {
        window.location.assign(res.data.gateway_url);
        return;
      }
      toast.error("Payment gateway URL was missing.");
    } catch (error) {
      const data = error.response?.data;
      toast.error(
        data?.detail?.[0] ||
          data?.detail ||
          data?.non_field_errors?.[0] ||
          "Could not start featured payment."
      );
    } finally {
      setFeaturing(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${job.title}"? This cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    try {
      await apiClient.delete(`jobs/${job.id}/`);
      toast.success("Job deleted.");
      navigate("/dashboard/posted-jobs");
    } catch {
      toast.error("Could not delete this job.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Spinner title="Loading job details..." />;
  if (!job) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <Link
        to="/dashboard/posted-jobs"
        className="mb-6 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        ← Back to posted jobs
      </Link>

      <JobDetailsView job={job} />

      <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-gray-200 pt-4">
        {isJobFeatured(job) ? (
          <span className="self-center text-sm font-medium text-amber-700">
            Featured until {featuredUntilLabel(job)}
          </span>
        ) : (
          <button
            type="button"
            onClick={handleFeature}
            disabled={featuring}
            className="ui-btn-lift rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-60"
          >
            {featuring
              ? "Redirecting..."
              : `Feature this job (${FEATURED_PRICE_LABEL})`}
          </button>
        )}
        <button
          type="button"
          onClick={() => navigate(`/dashboard/posted-jobs/${job.id}/applications`)}
          className="ui-btn-lift rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          View Applications
        </button>
        <button
          type="button"
          onClick={() => navigate(`/dashboard/post-job/${job.id}`)}
          className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="ui-btn-lift rounded-lg bg-red-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default PostedJobDetails;
