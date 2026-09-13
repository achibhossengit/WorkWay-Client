import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../services/ApiClient";
import Spinner from "../Utilities/Spinner";
import JobForm, { formToPayload } from "./JobForm";

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

const PostJobModal = ({ onClose, onCreated }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get("categories/");
        setCategories(Array.isArray(res.data) ? res.data : res.data.results || []);
      } catch {
        toast.error("Could not load categories.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const res = await apiClient.post("jobs/", formToPayload(formData));
      toast.success("Job published.");
      onCreated(res.data);
    } catch (error) {
      toast.error(getApiError(error, "Could not publish this job."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <dialog
      open
      className="modal modal-open modal-bottom backdrop-blur-sm sm:modal-middle"
    >
      <div className="modal-box flex max-h-[90dvh] w-11/12 max-w-4xl flex-col overflow-hidden p-0 sm:w-full">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-8">
          <h2 className="mb-1 text-2xl font-bold text-gray-800">Post Job</h2>
          <p className="mb-6 text-sm text-gray-500">
            Publish a new job. It will appear on the public /jobs page.
          </p>
          {loading ? (
            <Spinner title="Loading form..." />
          ) : (
            <JobForm
              key="create-job"
              categories={categories}
              submitting={submitting}
              submitLabel="Publish job"
              onSubmit={handleSubmit}
              onCancel={onClose}
            />
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit" onClick={onClose}>
          close
        </button>
      </form>
    </dialog>
  );
};

export default PostJobModal;
