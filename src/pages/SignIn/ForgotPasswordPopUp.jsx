import { FaTimes } from "react-icons/fa";
import apiClient from "../../services/ApiClient";
import { toast } from "react-toastify";
import { useState } from "react";

const ForgotPasswordPopUp = ({ isModalOpen, setIsModalOpen }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  if (!isModalOpen) return null;

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email) {
      setError("Email address is required.");
      setLoading(false);
      return;
    }

    try {
      const res = await apiClient.post("auth/users/reset_password/", { email });
      if (res) {
        toast.success(
          "Check your inbox to reset password."
        );
        setEmail('')
        setIsModalOpen(false);
      }
    } catch (err) {
      setError(
        err.response?.data?.email?.[0] ||
          "Something went wrong. Please try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto p-4 backdrop-blur-sm backdrop-brightness-50 sm:items-center"
      aria-hidden={!isModalOpen}
    >
      <div className="relative my-auto max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute right-2 top-2 cursor-pointer text-gray-400 transition hover:text-gray-600"
        >
          <FaTimes size={20} />
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-700 mb-4">
            Forgot Your Password?
          </h1>
          <p className="text-gray-600 mb-6">
            Provide your email address below. We'll send you a reset link if
            your account is valid.
          </p>
          <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              disabled={loading}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
          <p className="text-gray-500 text-sm mt-6">
            Remembered your password?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setIsModalOpen(false)}
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPopUp;
