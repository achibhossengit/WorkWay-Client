import { FaTimes } from "react-icons/fa";

const ActivationPopUp = ({ isOpen, onShowEmail, onLogin }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto p-4 backdrop-blur-sm backdrop-brightness-50 sm:items-center"
      aria-hidden={!isOpen}
    >
      <div className="relative my-auto max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-2xl">
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
              className="ui-btn-lift rounded-lg bg-blue-600 px-4 py-2 text-white shadow-md hover:bg-blue-700"
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
