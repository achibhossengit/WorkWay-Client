import { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import apiClient from "../../services/ApiClient";
import ReviewCard from "../../components/Reviews/ReviewCard";
import StarRating from "../../components/Reviews/StarRating";
import Spinner from "../../components/Utilities/Spinner";

const listFrom = (data) =>
  Array.isArray(data) ? data : data?.results || [];

const uniqueEmployersFromJobs = (jobs) => {
  const byId = new Map();
  jobs.forEach((job) => {
    const employer = job.employer;
    if (employer?.id && !byId.has(employer.id)) {
      byId.set(employer.id, employer);
    }
  });
  return [...byId.values()];
};

const fetchAllJobs = async () => {
  const jobs = [];
  for (let page = 1; page <= 20; page += 1) {
    const res = await apiClient.get(`jobs/?page=${page}`);
    const pageJobs = listFrom(res.data);
    jobs.push(...pageJobs);
    if (!res.data?.next || pageJobs.length === 0) break;
  }
  return jobs;
};

const EmployerReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

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
        Job seekers can rate your company. You can only read these reviews.
      </p>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
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
  const [employerId, setEmployerId] = useState("");
  const [ratings, setRatings] = useState(0);
  const [comment, setComment] = useState("");

  const reviewedIds = useMemo(
    () => new Set(reviews.map((review) => review.employer)),
    [reviews]
  );

  const availableEmployers = employers.filter(
    (employer) => !reviewedIds.has(employer.id)
  );

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const [reviewsRes, jobs] = await Promise.all([
          apiClient.get(`jobseekers/${user.id}/reviews/`),
          fetchAllJobs(),
        ]);
        setReviews(listFrom(reviewsRes.data));
        setEmployers(uniqueEmployersFromJobs(jobs));
      } catch {
        toast.error("Could not load reviews.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user?.id]);

  const resetForm = () => {
    setEmployerId("");
    setRatings(0);
    setComment("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!employerId) {
      toast.error("Select an employer to review.");
      return;
    }
    if (ratings < 1) {
      toast.error("Choose a star rating.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiClient.post(`jobseekers/${user.id}/reviews/`, {
        employer: Number(employerId),
        ratings,
        comment: comment.trim(),
      });
      setReviews((current) => [res.data, ...current]);
      resetForm();
      toast.success("Review submitted.");
    } catch (error) {
      const data = error.response?.data;
      const message =
        data?.non_field_errors?.[0] ||
        data?.detail ||
        "Could not submit this review.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner title="Loading reviews..." />;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">Reviews</h1>
        <p className="mb-6 text-sm text-gray-500">
          Rate an employer. Each employer can be reviewed once.
        </p>

        {availableEmployers.length === 0 ? (
          <p className="text-gray-500">
            You have already reviewed every employer with a posted job.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Employer
              </span>
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

            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit review"}
            </button>
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
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
