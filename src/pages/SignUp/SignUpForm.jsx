import { useForm } from "react-hook-form";
import {
  FaEnvelope,
  FaUser,
  FaLock,
  FaUserTie,
  FaUserCircle,
  FaArrowRight,
} from "react-icons/fa";

const SignUpForm = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      user_type: "Jobseeker",
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className={`block w-full pl-10 pr-3 py-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            I am registering as
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label
              className={`flex items-center justify-center py-3 px-4 border rounded-lg cursor-pointer ${
                watch("user_type") === "Jobseeker"
                  ? "bg-blue-50 border-blue-300 text-blue-700"
                  : "border-gray-300 text-gray-700"
              }`}
            >
              <input
                type="radio"
                {...register("user_type", {
                  required: "Please select user type",
                })}
                value="Jobseeker"
                className="sr-only"
              />
              <FaUserCircle className="mr-2" />
              Job Seeker
            </label>
            <label
              className={`flex items-center justify-center py-3 px-4 border rounded-lg cursor-pointer ${
                watch("user_type") === "Employer"
                  ? "bg-blue-50 border-blue-300 text-blue-700"
                  : "border-gray-300 text-gray-700"
              }`}
            >
              <input
                type="radio"
                {...register("user_type", {
                  required: "Please select user type",
                })}
                value="Employer"
                className="sr-only"
              />
              <FaUserTie className="mr-2" />
              Employer
            </label>
          </div>
          {errors.user_type && (
            <p className="mt-1 text-sm text-red-600">
              {errors.user_type.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-gray-400" />
            </div>
            <input
              id="username"
              name="username"
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username must not exceed 20 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    "Username can only contain letters, numbers, and underscores",
                },
              })}
              className={`block w-full pl-10 pr-3 py-3 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              placeholder="username"
            />
          </div>
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                validate: (value) => {
                  const hasUppercase = /[A-Z]/.test(value);
                  const hasNumber = /[0-9]/.test(value);
                  if (!hasUppercase)
                    return "Password must contain at least one uppercase letter";
                  if (!hasNumber)
                    return "Password must contain at least one number";
                },
              })}
              className={`block w-full pl-10 pr-3 py-3 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              placeholder="••••••••"
            />
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className={`block w-full pl-10 pr-3 py-3 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              placeholder="••••••••"
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition-colors duration-200`}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <>
              Create Account <FaArrowRight className="ml-2" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
