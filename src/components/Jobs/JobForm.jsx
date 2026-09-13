import { useForm } from "react-hook-form";
import { useEffect } from "react";

const fieldClass =
  "w-full rounded-xl border border-blue-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const WORKPLACES = [
  { value: "O", label: "Office" },
  { value: "H", label: "Home" },
  { value: "Hy", label: "Hybrid" },
];

const JOB_TYPES = [
  { value: "F", label: "Full Time" },
  { value: "H", label: "Part Time" },
  { value: "I", label: "Intern" },
];

const EDUCATIONS = [
  { value: "J.S.C", label: "J.S.C" },
  { value: "S.S.C", label: "S.S.C" },
  { value: "H.S.C", label: "H.S.C" },
  { value: "Master", label: "Master" },
];

const toDateInput = (iso) => (iso ? String(iso).slice(0, 10) : "");

export const jobToFormValues = (job) => ({
  title: job?.title || "",
  category: job?.category?.id || "",
  description: job?.details?.description || "",
  workplace: job?.details?.workplace || "O",
  type: job?.details?.status || "F",
  location: job?.details?.locations || "",
  salary: job?.details?.min_salary ?? "",
  deadline: toDateInput(job?.details?.deadline),
  education: job?.requirements?.education || "H.S.C",
  experience: job?.requirements?.experience ?? "",
  skills: job?.requirements?.skill || "",
});

export const formToPayload = (data) => ({
  title: data.title.trim(),
  category_id: Number(data.category),
  details: {
    description: data.description.trim(),
    workplace: data.workplace,
    status: data.type,
    locations: data.location.trim() || null,
    min_salary:
      data.salary === "" || data.salary == null ? null : Number(data.salary),
    deadline: data.deadline ? `${data.deadline}T23:59:00Z` : null,
  },
  requirements: {
    education: data.education,
    experience:
      data.experience === "" || data.experience == null
        ? null
        : Number(data.experience),
    skill: data.skills.trim() || null,
  },
});

const JobForm = ({
  categories = [],
  initialJob,
  submitting,
  submitLabel,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: jobToFormValues(initialJob),
  });

  useEffect(() => {
    reset(jobToFormValues(initialJob));
  }, [initialJob, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className={fieldClass}
            placeholder="e.g. Senior Django Developer"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className={fieldClass}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className={fieldClass}
            placeholder="e.g. Banani, Dhaka"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">
              {errors.location.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Workplace
          </label>
          <select
            {...register("workplace", { required: "Workplace is required" })}
            className={fieldClass}
          >
            {WORKPLACES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            {...register("type", { required: "Job type is required" })}
            className={fieldClass}
          >
            {JOB_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Salary (monthly)
          </label>
          <input
            type="number"
            min={1000}
            {...register("salary", {
              validate: (value) =>
                value === "" ||
                Number(value) >= 1000 ||
                "Salary must be at least 1000",
            })}
            className={fieldClass}
            placeholder="e.g. 80000"
          />
          {errors.salary && (
            <p className="mt-1 text-sm text-red-600">{errors.salary.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <input
            type="date"
            {...register("deadline", { required: "Deadline is required" })}
            className={fieldClass}
          />
          {errors.deadline && (
            <p className="mt-1 text-sm text-red-600">
              {errors.deadline.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Education
          </label>
          <select
            {...register("education", { required: "Education is required" })}
            className={fieldClass}
          >
            {EDUCATIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Experience (years)
          </label>
          <input
            type="number"
            min={0}
            max={30}
            {...register("experience", {
              validate: (value) =>
                value === "" ||
                (Number(value) >= 0 && Number(value) <= 30) ||
                "Experience must be between 0 and 30",
            })}
            className={fieldClass}
            placeholder="e.g. 3"
          />
          {errors.experience && (
            <p className="mt-1 text-sm text-red-600">
              {errors.experience.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Skills
          </label>
          <input
            type="text"
            {...register("skills", { required: "Skills are required" })}
            className={fieldClass}
            placeholder="Python, Django, PostgreSQL"
          />
          {errors.skills && (
            <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows={5}
            {...register("description", {
              required: "Description is required",
            })}
            className={fieldClass}
            placeholder="Describe the role, team, and expectations."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="ui-btn-lift rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default JobForm;
