import { useForm } from "react-hook-form";
import {
  FaUser,
  FaPhone,
  FaVenusMars,
  FaBuilding,
  FaMapMarkerAlt,
  FaGlobe,
  FaInfoCircle,
  FaTools,
  FaBriefcase,
  FaEnvelope,
} from "react-icons/fa";

const UpdateProfileModal = ({ user, handleClose, handleUpdate }) => {
  const userType = user.jobseeker ? "jobseeker" : "employer";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      contact_number: user.contact_number || "",
      gender: user.jobseeker?.gender || "",
      about: user.jobseeker?.about || "",
      skills: user.jobseeker?.skills || "",
      experiences: user.jobseeker?.experiences || "",
      current_address: user.jobseeker?.current_address || "",
      company: user.employer?.company || "",
      location: user.employer?.location || "",
      website: user.employer?.website || "",
      description: user.employer?.description || "",
    },
  });

  const onSubmit = (data) => {
    const profile_image = watch("profile_image")?.[0] || null;
    const resume = watch("resume")?.[0] || null;
    handleUpdate({ ...data, profile_image, resume });
  };

  const InputField = ({
    label,
    name,
    icon,
    placeholder,
    type = "text",
    validation,
  }) => (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
          className="border rounded p-2 w-full pl-10"
        />
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );

  const TextareaField = ({ label, name, icon, placeholder, validation }) => (
    <div>
      <div className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700">
        <span>{icon}</span>
        <label>{label}</label>
      </div>
      <textarea
        placeholder={placeholder}
        rows={4}
        {...register(name, validation)}
        className="border rounded p-2 w-full"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="First Name"
              name="first_name"
              icon={<FaUser />}
              placeholder="First Name"
              validation={{
                maxLength: { value: 100, message: "Max 100 characters" },
              }}
            />
            <InputField
              label="Last Name"
              name="last_name"
              icon={<FaUser />}
              placeholder="Last Name"
              validation={{
                maxLength: { value: 100, message: "Max 100 characters" },
              }}
            />
            <InputField
              label="Email"
              name="email"
              icon={<FaEnvelope />}
              placeholder="Email Address"
              type="email"
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              }}
            />
            <InputField
              label="Contact Number"
              name="contact_number"
              icon={<FaPhone />}
              placeholder="Contact Number"
              validation={{
                maxLength: { value: 15, message: "Max 15 characters" },
              }}
            />
          </div>

          {userType === "jobseeker" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <FaVenusMars />
                  </span>
                  <select
                    {...register("gender", { required: "Gender is required" })}
                    className="border rounded p-2 w-full pl-10"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              <InputField
                label="Skills"
                name="skills"
                icon={<FaTools />}
                placeholder="e.g. React, Node.js"
                validation={{
                  maxLength: { value: 150, message: "Max 150 characters" },
                }}
              />
              <InputField
                label="Experience (Years)"
                name="experiences"
                type="number"
                icon={<FaBriefcase />}
                placeholder="e.g. 2"
                validation={{
                  max: {
                    value: 100,
                    message: "Experience must be les than 101 years",
                  },
                  min: {
                    value: 0,
                    message: "Experience must be 0 or Positive value",
                  },
                  valueAsNumber: true,
                }}
              />
              <InputField
                label="Current Address"
                name="current_address"
                icon={<FaMapMarkerAlt />}
                placeholder="Your Address"
                validation={{
                  maxLength: { value: 200, message: "Max 200 characters" },
                }}
              />

              <div className="md:col-span-2">
                <TextareaField
                  label="About You"
                  name="about"
                  icon={<FaInfoCircle />}
                  placeholder="Write something about yourself"
                  validation={{
                    maxLength: { value: 500, message: "Max 500 characters" },
                  }}
                />
              </div>

              <div className="md:col-span-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Upload Resume</legend>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    {...register("resume")}
                    className="file-input focus:outline-none focus:ring-0 focus:ring-offset-0"
                  />
                  <label className="label">Max size 2MB</label>
                </fieldset>
              </div>
            </div>
          )}

          {userType === "employer" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Company"
                name="company"
                icon={<FaBuilding />}
                placeholder="Company Name"
                validation={{
                  maxLength: { value: 100, message: "Max 100 characters" },
                }}
              />
              <InputField
                label="Website"
                name="website"
                icon={<FaGlobe />}
                placeholder="Company Website"
                validation={{
                  pattern: {
                    value: /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}.*$/,
                    message: "Enter a valid URL",
                  },
                }}
              />
              <InputField
                label="Location"
                name="location"
                icon={<FaMapMarkerAlt />}
                placeholder="Company Location"
                validation={{
                  maxLength: { value: 100, message: "Max 100 characters" },
                }}
              />
              <div className="md:col-span-2">
                <TextareaField
                  label="Description"
                  name="description"
                  icon={<FaInfoCircle />}
                  placeholder="Company Description"
                  validation={{
                    maxLength: { value: 500, message: "Max 500 characters" },
                  }}
                />
              </div>
            </div>
          )}

          <fieldset className="fieldset">
            <legend className="fieldset-legend ">Pick a file</legend>
            <input
              type="file"
              accept="image/*"
              {...register("profile_image")}
              className="file-input focus:outline-none focus:ring-0 focus:ring-offset-0"
            />
            <label className="label">Max size 2MB</label>
          </fieldset>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
