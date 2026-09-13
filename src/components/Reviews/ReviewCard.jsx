import { FaQuoteLeft } from "react-icons/fa";
import StarRating from "./StarRating";

const ReviewCard = ({ review, onEdit, onDelete, busy }) => {
  const name = review.jobseeker_name || review.jobseeker_username || "Job seeker";
  const company = review.employer_company || "an employer";

  return (
    <div className="ui-card-lift rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
      <div className="mb-4">
        <StarRating value={review.ratings || 0} />
      </div>
      <FaQuoteLeft className="mb-4 text-gray-300" />
      <p className="mb-6 text-gray-700">
        {review.comment?.trim() || "No comment."}
      </p>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-gray-600">Reviewed {company}</p>
        </div>
        {(onEdit || onDelete) && (
          <div className="flex gap-2">
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(review)}
                disabled={busy}
                className="ui-btn-lift rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 disabled:opacity-60"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(review)}
                disabled={busy}
                className="ui-btn-lift rounded-lg px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-50 disabled:opacity-60"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
