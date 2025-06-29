import { Link, useNavigate } from "react-router";
import apiClient from "../../services/ApiClient";
import SignUpForm from "./SignUpForm";
import { toast } from "react-toastify";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    delete data.confirmPassword;
    try {
      const res = await apiClient.post("auth/users/", data);
      if (res) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error Occurred:", error.response?.data || error.message);

      if (error.response?.data) {
        for (const msg in error.response.data) {
          toast.error(error.response.data[msg][0]);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 py-6 px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-blue-100 mt-1">Join our platform today</p>
        </div>
        <div className="p-8">
          <SignUpForm onSubmit={onSubmit} loading={loading}/>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
