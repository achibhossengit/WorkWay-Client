import { useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router";
import apiClient from "../../services/ApiClient";
import { toast } from "react-toastify";

const PasswordReset = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    validatePasswords(value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validatePasswords(newPassword, value);
  };

  const validatePasswords = (password, confirmPassword) => {
    if (password && confirmPassword && password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
    }
  };

  const isFormValid = newPassword && confirmPassword && !error;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const new_password = e.target.newPassword.value;

    try {
      const res = await apiClient.post("/auth/users/reset_password_confirm/", {
        uid,
        token,
        new_password,
      });
      if (res.status === 204) {
        setLoading(false);
        toast.success('Password was reset successfully!')
        navigate("/login", { replace: true });
      }
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.new_password?.[0] ||
          "Something went wrong. Please try again!"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-100 text-center mb-6">
          Reset Your Password
        </h1>
        <form onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300 mb-2">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full py-2 px-4 rounded-lg transition duration-200 ${
              isFormValid && !loading
                ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </form>
        {/* Link to Login */}
        {!loading && (
          <p className="text-gray-500 text-sm mt-6 text-center">
            Remembered your password?{" "}
            <NavLink to="/login" className="text-blue-600 hover:underline">
              Log In
            </NavLink>
          </p>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
