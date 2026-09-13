import { useEffect, useState } from "react";
import apiClient from "../../services/ApiClient";
import ReviewCard from "../Reviews/ReviewCard";
import Spinner from "../Utilities/Spinner";

const listFrom = (data) =>
  Array.isArray(data) ? data : data?.results || [];

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get("reviews/?page_size=6");
        setReviews(listFrom(res.data));
      } catch {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            What Job Seekers Say
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
            Real ratings and comments left for employers on WorkWay
          </p>
        </div>

        {loading ? (
          <Spinner title="Loading reviews..." />
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
