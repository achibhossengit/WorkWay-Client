import { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaUserTie,
  FaBuilding,
  FaCamera,
  FaFileAlt,
  FaGlobe,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import apiClient from "../../services/ApiClient";

const parseSkills = (skills) => {
  if (Array.isArray(skills)) {
    return skills.map((skill) => String(skill).trim()).filter(Boolean);
  }
  if (typeof skills === "string") {
    return skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }
  return [];
};

const getDefaults = (user) => ({
  first_name: user?.first_name || "",
  last_name: user?.last_name || "",
  email: user?.email || "",
  contact_number: user?.contact_number || "",
  gender: user?.jobseeker?.gender || "",
  about: user?.jobseeker?.about || "",
  skills: Array.isArray(user?.jobseeker?.skills)
    ? user.jobseeker.skills.join(", ")
    : user?.jobseeker?.skills || "",
  experiences: user?.jobseeker?.experiences ?? "",
  current_address: user?.jobseeker?.current_address || "",
  company: user?.employer?.company || "",
  location: user?.employer?.location || "",
  website: user?.employer?.website || "",
  description: user?.employer?.description || "",
});

const fieldClass = (enabled) =>
  `w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition ${
    enabled
      ? "border-blue-300 bg-white text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      : "border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed"
  }`;

const Profile = () => {
  const { user, fetchUser } = useContext(AuthContext);
  const [editingSection, setEditingSection] = useState(null);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaults(user),
  });

  useEffect(() => {
    if (user) reset(getDefaults(user));
  }, [user, reset]);

  const selectedImage = watch("profile_image");
  const selectedResume = watch("resume");
  const previewUrl = useMemo(() => {
    const file = selectedImage?.[0];
    if (file) return URL.createObjectURL(file);
    return user?.profile_picture || "";
  }, [selectedImage, user?.profile_picture]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const startEdit = (section) => {
    reset(getDefaults(user));
    setEditingSection(section);
  };

  const cancelEdit = () => {
    reset(getDefaults(user));
    setEditingSection(null);
  };

  const onSubmit = async (data) => {
    if (!user?.id) return;

    const formData = new FormData();
    formData.append("first_name", data.first_name || "");
    formData.append("last_name", data.last_name || "");
    formData.append("email", data.email || "");
    formData.append("contact_number", data.contact_number || "");

    if (data.profile_image?.[0]) {
      formData.append("profile_picture", data.profile_image[0]);
    }

    const isJobseeker = user.user_type === "Jobseeker";
    const endpoint = isJobseeker
      ? `jobseekers/${user.id}/`
      : `employers/${user.id}/`;

    if (isJobseeker) {
      formData.append(
        "jobseeker",
        JSON.stringify({
          gender: data.gender || "",
          about: data.about || "",
          skills: parseSkills(data.skills),
          experiences: Number(data.experiences) || 0,
          current_address: data.current_address || "",
        })
      );
      if (data.resume?.[0]) {
        formData.append("resume", data.resume[0]);
      }
    } else {
      formData.append(
        "employer",
        JSON.stringify({
          company: data.company || "",
          location: data.location || "",
          website: data.website || "",
          description: data.description || "",
        })
      );
    }

    setSaving(true);
    try {
      await apiClient.patch(endpoint, formData);
      await fetchUser();
      setEditingSection(null);
      toast.success("Profile updated successfully.");
    } catch (error) {
      const apiErrors = error.response?.data;
      const message =
        (typeof apiErrors === "string" && apiErrors) ||
        apiErrors?.detail ||
        apiErrors?.email?.[0] ||
        "Could not update profile. Please try again.";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const SectionActions = ({ section }) =>
    editingSection === section ? (
      <div className="flex gap-2">
        <button
          type="button"
          onClick={cancelEdit}
          disabled={saving}
          className="rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    ) : (
      <button
        type="button"
        onClick={() => startEdit(section)}
        className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
      >
        <FaEdit size={13} />
        Edit
      </button>
    );

  if (!user) return null;

  const isJobseeker = user.user_type === "Jobseeker";
  const personalEditing = editingSection === "personal";
  const careerEditing = editingSection === "career";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen bg-gray-50 py-10 px-4"
    >
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-3">
            <h3 className="flex items-center text-lg font-semibold text-gray-800">
              <span className="mr-3 rounded-lg bg-blue-500 p-2 text-white">
                {isJobseeker ? <FaUserTie size={16} /> : <FaBuilding size={16} />}
              </span>
              Personal information
            </h3>
            <SectionActions section="personal" />
          </div>

          <div className="mb-6 flex justify-center">
            <label
              className={`relative shrink-0 ${personalEditing ? "cursor-pointer" : "cursor-default"}`}
            >
              <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-blue-500 bg-slate-100">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-slate-400">
                    {(user.first_name || user.username || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}
              </div>
              {personalEditing && (
                <span className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-slate-900/50 text-xs font-medium text-white">
                  <FaCamera className="mb-1 text-lg" />
                  Change
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={!personalEditing}
                {...register("profile_image")}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-slate-500">First name</label>
              <input
                disabled={!personalEditing}
                {...register("first_name", {
                  maxLength: { value: 100, message: "Max 100 characters" },
                })}
                className={fieldClass(personalEditing)}
              />
              {errors.first_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.first_name.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-500">Last name</label>
              <input
                disabled={!personalEditing}
                {...register("last_name", {
                  maxLength: { value: 100, message: "Max 100 characters" },
                })}
                className={fieldClass(personalEditing)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-500">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-slate-400" size={14} />
                <input
                  disabled={!personalEditing}
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email format",
                    },
                  })}
                  className={`${fieldClass(personalEditing)} pl-9`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-500">
                Contact number
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-slate-400" size={14} />
                <input
                  disabled={!personalEditing}
                  {...register("contact_number", {
                    maxLength: { value: 15, message: "Max 15 characters" },
                  })}
                  className={`${fieldClass(personalEditing)} pl-9`}
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm text-slate-500">
                {isJobseeker ? "About me" : "Company overview"}
              </label>
              <textarea
                rows={4}
                disabled={!personalEditing}
                {...register(isJobseeker ? "about" : "description", {
                  maxLength: { value: 500, message: "Max 500 characters" },
                })}
                className={`${fieldClass(personalEditing)} resize-none`}
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              {isJobseeker ? "Career details" : "Company details"}
            </h3>
            <SectionActions section="career" />
          </div>

          {isJobseeker ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-slate-500">Gender</label>
                  <select
                    disabled={!careerEditing}
                    {...register("gender")}
                    className={fieldClass(careerEditing)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-slate-500">
                    Experience (years)
                  </label>
                  <input
                    type="number"
                    disabled={!careerEditing}
                    {...register("experiences", { valueAsNumber: true })}
                    className={fieldClass(careerEditing)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm text-slate-500">
                    Current address
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt
                      className="absolute left-3 top-3 text-slate-400"
                      size={14}
                    />
                    <input
                      disabled={!careerEditing}
                      {...register("current_address")}
                      className={`${fieldClass(careerEditing)} pl-9`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-500">
                  Skills & expertise
                </label>
                {careerEditing ? (
                  <input
                    {...register("skills")}
                    placeholder="e.g. React, Node.js"
                    className={fieldClass(true)}
                  />
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {parseSkills(watch("skills")).length > 0 ? (
                      parseSkills(watch("skills")).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">Not found</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-500">Resume</label>
                <div className="flex flex-wrap items-center gap-4">
                  {user.jobseeker?.resume && (
                    <a
                      href={user.jobseeker.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                    >
                      View Resume
                    </a>
                  )}
                  {careerEditing ? (
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 hover:border-blue-400">
                      <FaFileAlt className="text-blue-600" />
                      <span className="text-sm text-slate-600">
                        {selectedResume?.[0]?.name || "Choose a new resume"}
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.png"
                        className="hidden"
                        {...register("resume")}
                      />
                    </label>
                  ) : (
                    !user.jobseeker?.resume && (
                      <p className="text-sm text-gray-500">Not found</p>
                    )
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-slate-500">
                  Company name
                </label>
                <input
                  disabled={!careerEditing}
                  {...register("company")}
                  className={fieldClass(careerEditing)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-slate-500">Location</label>
                <div className="relative">
                  <FaMapMarkerAlt
                    className="absolute left-3 top-3 text-slate-400"
                    size={14}
                  />
                  <input
                    disabled={!careerEditing}
                    {...register("location")}
                    className={`${fieldClass(careerEditing)} pl-9`}
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm text-slate-500">Website</label>
                <div className="relative">
                  <FaGlobe className="absolute left-3 top-3 text-slate-400" size={14} />
                  <input
                    disabled={!careerEditing}
                    {...register("website", {
                      pattern: {
                        value: /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}.*$/,
                        message: "Enter a valid URL",
                      },
                    })}
                    className={`${fieldClass(careerEditing)} pl-9`}
                  />
                </div>
                {errors.website && (
                  <p className="mt-1 text-sm text-red-500">{errors.website.message}</p>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </form>
  );
};

export default Profile;
