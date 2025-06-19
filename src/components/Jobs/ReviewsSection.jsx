// Reviews Section Component

import { FaQuoteLeft, FaRegStar, FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Sarah Johnson",
    role: "Software Developer",
    rating: 5,
    content:
      "Found my dream job within two weeks of using this platform. The matching system is incredibly accurate!",
  },
  {
    name: "Michael Chen",
    role: "HR Manager",
    rating: 4,
    content:
      "As an employer, we've hired several excellent candidates through this service. Highly recommended.",
  },
  {
    name: "Amina Rahman",
    role: "Marketing Specialist",
    rating: 5,
    content:
      "The career resources helped me negotiate a 20% higher salary than I expected. Very grateful!",
  },
];

const ReviewsSection = () => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) =>
      i < rating ? (
        <FaStar key={i} className="text-yellow-400" />
      ) : (
        <FaRegStar key={i} className="text-yellow-400" />
      )
    );
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            What Our Users Say
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from job seekers and employers who found success with our
            platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg border border-gray-200"
            >
              <div className="mb-4 flex">{renderStars(review.rating)}</div>
              <FaQuoteLeft className="text-gray-300 mb-4" />
              <p className="text-gray-700 mb-6">{review.content}</p>
              <div>
                <h4 className="font-semibold text-gray-800">{review.name}</h4>
                <p className="text-gray-600">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
