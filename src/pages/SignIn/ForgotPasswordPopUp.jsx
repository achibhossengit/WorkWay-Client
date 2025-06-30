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
      className="fixed inset-0 flex items-center justify-center backdrop-brightness-50 backdrop-blur-sm z-50"
      aria-hidden={!isModalOpen}
    >
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
        {/* Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute cursor-pointer top-2 right-2 text-gray-400 hover:text-gray-600 transition"
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
