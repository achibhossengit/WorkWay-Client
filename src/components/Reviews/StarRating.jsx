import { FaRegStar, FaStar } from "react-icons/fa";

const StarRating = ({ value = 0, onChange, size = "text-lg" }) => {
  const stars = [1, 2, 3, 4, 5];

  if (!onChange) {
    return (
      <div className={`flex ${size}`} aria-label={`${value} out of 5 stars`}>
        {stars.map((star) =>
          star <= value ? (
            <FaStar key={star} className="text-yellow-400" />
          ) : (
            <FaRegStar key={star} className="text-yellow-400" />
          )
        )}
      </div>
    );
  }

  return (
    <div className={`flex gap-1 ${size}`} role="radiogroup" aria-label="Rating">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={star === value}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          onClick={() => onChange(star)}
          className="text-yellow-400 hover:scale-110"
        >
          {star <= value ? <FaStar /> : <FaRegStar />}
        </button>
      ))}
    </div>
  );
};

export default StarRating;
