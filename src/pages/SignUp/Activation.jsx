import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import apiClient from "../../services/ApiClient";

const Activation = () => {
  const { uid, token } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleActivation = async () => {
    setLoading(true);
    try {
      const res = await apiClient.post("auth/users/activation/", {
        uid,
        token,
      });
      if (res) {
        toast.success("Account activated successfully!", {
          position: "top-center",
        });
        navigate('/login')
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || "An error occurred during activation.";
      toast.error(errorMessage, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 text-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 md:p-12 max-w-md w-full">
        <div className="flex justify-center mb-4 text-blue-600">
          <FaCheckCircle size={60} />
        </div>
        <h1 className="text-2xl font-bold text-blue-700 mb-2">
          Activate Your Account
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for joining us! Click the button below to activate your
          account.
        </p>
        <button
          onClick={handleActivation}
          disabled={loading}
          className={`w-full py-3 rounded-lg shadow-md font-semibold transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-gray-700"
              : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          }`}
        >
          {loading ? "Activating..." : "Activate Now"}
        </button>
        <p className="text-gray-500 text-sm mt-4">
          If you encounter any issues, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default Activation;
