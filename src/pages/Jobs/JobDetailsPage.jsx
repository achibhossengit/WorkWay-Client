import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { FaFileAlt } from "react-icons/fa";
import { AuthContext } from "../../context/authContext";
import apiClient from "../../services/ApiClient";
import Spinner from "../../components/Utilities/Spinner";
import JobDetailsView from "../../components/Jobs/JobDetailsView";
import { isDeadlinePassed } from "../../components/Utilities/UtilityFunctions";

const listFrom = (data) =>
  Array.isArray(data) ? data : data?.results || [];

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const { user, fetchUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const jobRes = await apiClient.get(`jobs/${jobId}/`);
        setJob(jobRes.data);

        if (user?.user_type === "Jobseeker" && user?.id) {
          const appsRes = await apiClient.get(
            `jobseekers/${user.id}/applications/`
          );
          const match = listFrom(appsRes.data).find(
            (app) => String(app.job) === String(jobId)
          );
          setApplication(match || null);
        } else {
          setApplication(null);
        }
      } catch {
        toast.error("Could not load this job.");
        navigate("/jobs");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [jobId, user?.id, user?.user_type, navigate]);

  const isEmployer = user?.user_type === "Employer";
  const isCancelled = application?.status === "C";
  const hasApplied = Boolean(application) && !isCancelled;
  const canCancel = hasApplied;
  const deadlinePassed = isDeadlinePassed(job?.details?.deadline);
  const canApply = !isEmployer && !hasApplied && !deadlinePassed;
  const hasResume = Boolean(user?.jobseeker?.resume);
  const needsResumeUpload =
    user?.user_type === "Jobseeker" && !hasResume && canApply;

  const uploadResumeIfNeeded = async () => {
    if (hasResume) return true;
    if (!resumeFile) {
      toast.error("Upload a resume to apply for this job.");
      return false;
    }
    const formData = new FormData();
    formData.append("resume", resumeFile);
    await apiClient.patch(`jobseekers/${user.id}/`, formData);
    await fetchUser();
    return true;
  };

  const handleApply = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.user_type !== "Jobseeker") {
      toast.error("Only job seekers can apply.");
      return;
    }
    if (deadlinePassed) {
      toast.error("The application deadline has passed.");
      return;
    }

    setApplying(true);
    try {
      const ready = await uploadResumeIfNeeded();
      if (!ready) return;

      const res = await apiClient.post(`jobseekers/${user.id}/applications/`, {
        job: Number(jobId),
      });
      setApplication(res.data);
      setResumeFile(null);
      toast.success("Application submitted successfully.");
    } catch (error) {
      const data = error.response?.data;
      const message =
        (Array.isArray(data) && data[0]) ||
        data?.non_field_errors?.[0] ||
        (typeof data === "string" && data) ||
        data?.detail ||
        data?.job?.[0] ||
        "Could not apply for this job.";
      toast.error(message);
    } finally {
      setApplying(false);
    }
  };

  const handleCancel = async () => {
    if (!application?.id) return;
    if (!window.confirm("Cancel this application?")) return;

    setCancelling(true);
    try {
      const res = await apiClient.patch(
        `jobseekers/${user.id}/applications/${application.id}/`,
        { status: "C" }
      );
      setApplication((current) => ({ ...current, ...res.data, status: "C" }));
      toast.success("Application cancelled.");
    } catch {
      toast.error("Could not cancel this application.");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <Spinner title="Loading job details..." />;
  if (!job) return null;

  return (
    <div className="bg-gray-50 py-8 sm:py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link
            to="/jobs"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back to jobs
          </Link>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-md sm:p-8">
          <JobDetailsView job={job} application={application} />

          {deadlinePassed && !hasApplied && (
            <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              The application deadline has passed. New applications are closed.
            </p>
          )}

          {needsResumeUpload && (
            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="mb-3 text-sm font-medium text-amber-900">
                A resume is required to apply. Upload one to continue.
              </p>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-amber-300 bg-white px-4 py-3 hover:border-amber-400">
                <FaFileAlt className="shrink-0 text-amber-700" />
                <span className="min-w-0 truncate text-sm text-slate-700">
                  {resumeFile?.name || "Choose resume (PDF, JPG, or PNG)"}
                </span>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(event) =>
                    setResumeFile(event.target.files?.[0] || null)
                  }
                />
              </label>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-gray-200 pt-4">
            {canCancel ? (
              <button
                type="button"
                onClick={handleCancel}
                disabled={cancelling}
                className="rounded-lg border border-red-600 bg-red-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
              >
                {cancelling ? "Cancelling..." : "Cancel application"}
              </button>
            ) : canApply ? (
              <button
                type="button"
                onClick={handleApply}
                disabled={applying}
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {applying
                  ? "Applying..."
                  : application?.status === "C"
                    ? "Re-apply"
                    : "Apply Now"}
              </button>
            ) : (
              !isEmployer &&
              deadlinePassed && (
                <button
                  type="button"
                  disabled
                  className="rounded-lg bg-slate-400 px-6 py-2.5 text-sm font-medium text-white opacity-80"
                >
                  Deadline passed
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
