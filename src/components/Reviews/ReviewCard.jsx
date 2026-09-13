import { FaQuoteLeft } from "react-icons/fa";
import StarRating from "./StarRating";

const ReviewCard = ({ review }) => {
  const name = review.jobseeker_name || review.jobseeker_username || "Job seeker";
  const company = review.employer_company || "an employer";

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
      <div className="mb-4">
        <StarRating value={review.ratings || 0} />
      </div>
      <FaQuoteLeft className="mb-4 text-gray-300" />
      <p className="mb-6 text-gray-700">
        {review.comment?.trim() || "No comment."}
      </p>
      <div>
        <h4 className="font-semibold text-gray-800">{name}</h4>
        <p className="text-gray-600">Reviewed {company}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
