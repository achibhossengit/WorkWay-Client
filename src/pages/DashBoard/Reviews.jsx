import { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import apiClient from "../../services/ApiClient";
import ReviewCard from "../../components/Reviews/ReviewCard";
import StarRating from "../../components/Reviews/StarRating";
import Spinner from "../../components/Utilities/Spinner";
import Pagination from "../../components/Utilities/Pagination";
import useClientPagination from "../../hooks/useClientPagination";

const listFrom = (data) =>
  Array.isArray(data) ? data : data?.results || [];

const FINISHED_STATUSES = new Set(["A", "X"]);

const employersFromFinishedApplications = (applications) => {
  const byId = new Map();
  applications.forEach((application) => {
    if (!FINISHED_STATUSES.has(application.status)) return;
    const id = application.employer_id;
    if (!id || byId.has(id)) return;
    byId.set(id, {
      id,
      company: application.employer_company,
      username: application.employer_username,
    });
  });
  return [...byId.values()];
};

const EmployerReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentPage, totalPage, pageItems, handlePageChange } =
    useClientPagination(reviews, 10);

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const res = await apiClient.get(`employers/${user.id}/reviews/`);
        setReviews(listFrom(res.data));
      } catch {
        toast.error("Could not load reviews.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user?.id]);

  if (loading) return <Spinner title="Loading reviews..." />;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <h1 className="mb-2 text-2xl font-bold text-gray-800">Reviews</h1>
      <p className="mb-6 text-sm text-gray-500">
        Job seekers can rate your company after an application is finished. You
        can only read these reviews.
      </p>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {pageItems.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
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

const JobseekerReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [employerId, setEmployerId] = useState("");
  const [ratings, setRatings] = useState(0);
  const [comment, setComment] = useState("");
  const { currentPage, totalPage, pageItems, handlePageChange } =
    useClientPagination(reviews, 10);

  const reviewedIds = useMemo(
    () => new Set(reviews.map((review) => review.employer)),
    [reviews]
  );

  const availableEmployers = employers.filter(
    (employer) => !reviewedIds.has(employer.id)
  );

  const editingReview = reviews.find((review) => review.id === editingId);

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const [reviewsRes, appsRes] = await Promise.all([
          apiClient.get(`jobseekers/${user.id}/reviews/`),
          apiClient.get(`jobseekers/${user.id}/applications/`),
        ]);
        setReviews(listFrom(reviewsRes.data));
        setEmployers(
          employersFromFinishedApplications(listFrom(appsRes.data))
        );
      } catch {
        toast.error("Could not load reviews.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user?.id]);

  const resetForm = () => {
    setEditingId(null);
    setEmployerId("");
    setRatings(0);
    setComment("");
  };

  const startEdit = (review) => {
    setEditingId(review.id);
    setEmployerId(String(review.employer));
    setRatings(review.ratings || 0);
    setComment(review.comment || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (review) => {
    if (!window.confirm("Delete this review?")) return;
    setSubmitting(true);
    try {
      await apiClient.delete(`jobseekers/${user.id}/reviews/${review.id}/`);
      setReviews((current) => current.filter((item) => item.id !== review.id));
      if (editingId === review.id) resetForm();
      toast.success("Review deleted.");
    } catch {
      toast.error("Could not delete this review.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!editingId && !employerId) {
      toast.error("Select an employer to review.");
      return;
    }
    if (ratings < 1) {
      toast.error("Choose a star rating.");
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        const res = await apiClient.patch(
          `jobseekers/${user.id}/reviews/${editingId}/`,
          {
            ratings,
            comment: comment.trim(),
          }
        );
        setReviews((current) =>
          current.map((review) =>
            review.id === editingId ? { ...review, ...res.data } : review
          )
        );
        resetForm();
        toast.success("Review updated.");
      } else {
        const res = await apiClient.post(`jobseekers/${user.id}/reviews/`, {
          employer: Number(employerId),
          ratings,
          comment: comment.trim(),
        });
        setReviews((current) => [res.data, ...current]);
        resetForm();
        toast.success("Review submitted.");
      }
    } catch (error) {
      const data = error.response?.data;
      const message =
        data?.non_field_errors?.[0] ||
        (Array.isArray(data) && data[0]) ||
        data?.detail ||
        "Could not save this review.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner title="Loading reviews..." />;

  const showCreateForm = !editingId && availableEmployers.length > 0;
  const showEditForm = Boolean(editingId);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">Reviews</h1>
        <p className="mb-6 text-sm text-gray-500">
          You can review an employer only after an application is accepted or
          rejected. One review per employer.
        </p>

        {!showCreateForm && !showEditForm ? (
          <p className="text-gray-500">
            {employers.length === 0
              ? "No finished applications yet. Reviews unlock when an application is accepted or rejected."
              : "You have already reviewed every eligible employer."}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Employer
              </span>
              {showEditForm ? (
                <input
                  type="text"
                  disabled
                  value={
                    editingReview?.employer_company ||
                    editingReview?.employer_username ||
                    "Employer"
                  }
                  className="w-full rounded-lg border border-gray-300 bg-slate-50 px-3 py-2 text-sm text-gray-600"
                />
              ) : (
                <select
                  value={employerId}
                  onChange={(event) => setEmployerId(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="">Select an employer</option>
                  {availableEmployers.map((employer) => (
                    <option key={employer.id} value={employer.id}>
                      {employer.company || employer.username}
                    </option>
                  ))}
                </select>
              )}
            </label>

            <div>
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Rating
              </span>
              <StarRating value={ratings} onChange={setRatings} size="text-2xl" />
            </div>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Comment
              </span>
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="Share your experience with this employer"
              />
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="ui-btn-lift rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {submitting
                  ? "Saving..."
                  : showEditForm
                    ? "Update review"
                    : "Submit review"}
              </button>
              {showEditForm && (
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={submitting}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-60"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Your reviews
        </h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">You have not reviewed any employer yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {pageItems.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onEdit={startEdit}
                  onDelete={handleDelete}
                  busy={submitting}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

const Reviews = () => {
  const { user } = useContext(AuthContext);
  return user?.user_type === "Employer" ? (
    <EmployerReviews />
  ) : (
    <JobseekerReviews />
  );
};

export default Reviews;
