import { FaTimes } from "react-icons/fa";

const ActivationPopUp = ({ isOpen, onClose, onShowEmail, onLogin }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-brightness-50 backdrop-blur-sm z-50"
      aria-hidden={!isOpen}
    >
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-2 right-2 text-gray-400 hover:text-gray-600 transition"
        >
          <FaTimes size={20} />
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-700 mb-4">
            Check Your Email!
          </h1>
          <p className="text-gray-600 mb-6">
            We have sent you an email with an activation link. Please check your
            inbox to activate your account.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onShowEmail}
              className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              Check Email
            </button>
            <button
              onClick={onLogin}
              className="bg-gray-300 cursor-pointer text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
            >
              Log In Now
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            Didn't receive the email? Check your spam folder or contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivationPopUp;
