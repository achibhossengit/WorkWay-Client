import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaFileAlt } from "react-icons/fa";
import { AuthContext } from "../../context/authContext";
import apiClient from "../../services/ApiClient";
import JobDetailsView from "./JobDetailsView";

const JobDetailsModal = ({
  job,
  setIsModalOpen,
  application,
  onCancelApplication,
  onReapplyApplication,
  cancelling,
}) => {
  const { user, fetchUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const isEmployer = user?.user_type === "Employer";
  const isCancelled = application?.status === "C";
  const canCancel = Boolean(application) && !isCancelled;
  const hasApplied = canCancel || applied;
  const hasResume = Boolean(user?.jobseeker?.resume);
  const needsResumeUpload =
    user?.user_type === "Jobseeker" && !hasResume && !hasApplied;

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

    setApplying(true);
    try {
      const ready = await uploadResumeIfNeeded();
      if (!ready) return;

      const res = await apiClient.post(`jobseekers/${user.id}/applications/`, {
        job: job.id,
      });
      setApplied(true);
      onReapplyApplication?.(res.data);
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

  return (
    <dialog
      open
      className="modal modal-bottom backdrop-blur-sm sm:modal-middle"
    >
      <div className="modal-box max-w-4xl overflow-hidden p-0">
        <div className="p-8">
          <JobDetailsView job={job} application={application} />

          {needsResumeUpload && (
            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="mb-3 text-sm font-medium text-amber-900">
                A resume is required to apply. Upload one to continue.
              </p>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-amber-300 bg-white px-4 py-3 hover:border-amber-400">
                <FaFileAlt className="text-amber-700" />
                <span className="text-sm text-slate-700">
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

          <div className="mt-8 flex justify-end gap-3 border-t border-gray-200 pt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-outline px-6 hover:bg-gray-100"
            >
              Close
            </button>
            {canCancel ? (
              <button
                type="button"
                onClick={() => onCancelApplication?.(application.id)}
                disabled={cancelling}
                className="btn border-red-600 bg-red-600 px-6 text-white hover:bg-red-700 disabled:opacity-60"
              >
                {cancelling ? "Cancelling..." : "Cancel application"}
              </button>
            ) : (
              !isEmployer && (
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={applying || hasApplied}
                  className="btn btn-primary bg-blue-600 px-6 text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {hasApplied
                    ? "Applied"
                    : applying
                      ? "Applying..."
                      : "Apply Now"}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default JobDetailsModal;
