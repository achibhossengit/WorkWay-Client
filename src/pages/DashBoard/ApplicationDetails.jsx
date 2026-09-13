import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFileAlt,
  FaUserTie,
} from "react-icons/fa";
import { AuthContext } from "../../context/authContext";
import apiClient from "../../services/ApiClient";
import Spinner from "../../components/Utilities/Spinner";
import { formatDate } from "../../components/Utilities/UtilityFunctions";
import {
  NEXT_STATUS,
  STATUS_LABELS,
  STATUS_STYLES,
  applicantName,
} from "../../components/Applications/applicationStatus";

const ApplicationDetails = () => {
  const { jobId, applicationId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const [jobRes, appRes] = await Promise.all([
          apiClient.get(`jobs/${jobId}/`),
          apiClient.get(
            `employers/${user.id}/jobs/${jobId}/applications/${applicationId}/`
          ),
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
        setApplication(appRes.data);
      } catch {
        toast.error("Could not load this application.");
        navigate(`/dashboard/posted-jobs/${jobId}/applications`);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [jobId, applicationId, user?.id, user?.username, navigate]);

  const handleStatusChange = async (status) => {
    setUpdating(true);
    try {
      const res = await apiClient.patch(
        `employers/${user.id}/jobs/${jobId}/applications/${applicationId}/`,
        { status }
      );
      setApplication((current) => ({ ...current, ...res.data }));
      toast.success(`Marked as ${STATUS_LABELS[status]}.`);
    } catch {
      toast.error("Could not update application status.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Spinner title="Loading application..." />;
  if (!application) return null;

  const applicant = application.applicant || {};
  const name = applicantName(applicant);
  const nextStatus = NEXT_STATUS[application.status];
  const skills = Array.isArray(applicant.skills)
    ? applicant.skills
    : String(applicant.skills || "")
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <Link
        to={`/dashboard/posted-jobs/${jobId}/applications`}
        className="mb-6 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        ← Back to applications
      </Link>

      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row">
        <div className="flex items-start gap-4">
          {applicant.profile_picture ? (
            <img
              src={applicant.profile_picture}
              alt={name}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-semibold text-blue-700">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
            <p className="text-sm text-gray-500">@{applicant.username}</p>
            <p className="mt-1 text-sm text-gray-600">
              Applied for {job?.title || application.job_title} •{" "}
              {formatDate(application.applied_at)}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            STATUS_STYLES[application.status] || "bg-slate-100 text-slate-700"
          }`}
        >
          {STATUS_LABELS[application.status] || application.status}
        </span>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 rounded-lg bg-gray-50 p-4 md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">Email</p>
          {applicant.email ? (
            <a
              href={`mailto:${applicant.email}`}
              className="inline-flex items-center gap-2 font-medium text-blue-600 hover:underline"
            >
              <FaEnvelope className="text-gray-400" />
              {applicant.email}
            </a>
          ) : (
            <p className="font-medium text-gray-700">Not provided</p>
          )}
        </div>
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="inline-flex items-center gap-2 font-medium text-gray-800">
            <FaPhone className="text-gray-400" />
            {applicant.contact_number || "Not provided"}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Address</p>
          <p className="inline-flex items-center gap-2 font-medium text-gray-800">
            <FaMapMarkerAlt className="text-gray-400" />
            {applicant.current_address || "Not provided"}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Experience</p>
          <p className="inline-flex items-center gap-2 font-medium text-gray-800">
            <FaUserTie className="text-gray-400" />
            {applicant.experiences != null
              ? `${applicant.experiences} years`
              : "Not specified"}
            {applicant.gender ? ` • ${applicant.gender}` : ""}
          </p>
        </div>
      </div>

      {applicant.about && (
        <div className="mb-8">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">About</h2>
          <p className="leading-relaxed text-gray-700">{applicant.about}</p>
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-end gap-3 border-t border-gray-200 pt-4">
        {applicant.resume ? (
          <a
            href={applicant.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-6 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100"
          >
            <FaFileAlt />
            Resume
          </a>
        ) : (
          <span className="px-2 py-2.5 text-sm text-gray-400">No resume</span>
        )}
        {nextStatus && (
          <button
            type="button"
            onClick={() => handleStatusChange(nextStatus)}
            disabled={updating}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {updating
              ? "Updating..."
              : `Mark as ${STATUS_LABELS[nextStatus]}`}
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplicationDetails;
