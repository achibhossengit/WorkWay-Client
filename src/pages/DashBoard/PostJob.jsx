import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import apiClient from "../../services/ApiClient";
import Spinner from "../../components/Utilities/Spinner";
import JobForm, { formToPayload } from "../../components/Jobs/JobForm";

const getApiError = (error, fallback) => {
  const data = error.response?.data;
  if (!data) return fallback;
  if (typeof data === "string") return data;
  if (Array.isArray(data) && data[0]) return data[0];
  return (
    data.detail ||
    data.non_field_errors?.[0] ||
    data.title?.[0] ||
    data.category_id?.[0] ||
    data.details?.[0] ||
    data.requirements?.[0] ||
    fallback
  );
};

const PostJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [categoryRes, jobRes] = await Promise.all([
          apiClient.get("categories/"),
          apiClient.get(`jobs/${jobId}/`),
        ]);
        const categoryData = Array.isArray(categoryRes.data)
          ? categoryRes.data
          : categoryRes.data.results || [];
        setCategories(categoryData);

        if (
          user?.username &&
          jobRes.data.employer?.username &&
          jobRes.data.employer.username !== user.username
        ) {
          toast.error("You can only edit your own jobs.");
          navigate("/dashboard/posted-jobs");
          return;
        }
        setJob(jobRes.data);
      } catch {
        toast.error("Could not load this job.");
        navigate("/dashboard/posted-jobs");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [jobId, user?.username, navigate]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await apiClient.put(`jobs/${jobId}/`, formToPayload(formData));
      toast.success("Job updated.");
      navigate(`/dashboard/posted-jobs/${jobId}`);
    } catch (error) {
      toast.error(getApiError(error, "Could not update this job."));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner title="Loading job..." />;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <h1 className="mb-2 text-2xl font-bold text-gray-800">Edit Job</h1>
      <p className="mb-6 text-sm text-gray-500">
        Update this listing. Changes will show on /jobs.
      </p>
      <JobForm
        categories={categories}
        initialJob={job}
        submitting={submitting}
        submitLabel="Save changes"
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/dashboard/posted-jobs/${jobId}`)}
      />
    </div>
  );
};

export default PostJob;
