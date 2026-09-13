export const STATUS_LABELS = {
  P: "Pending",
  R: "Reviewed",
  A: "Accept",
  X: "Rejected",
  C: "Cancelled",
};

export const STATUS_STYLES = {
  P: "bg-amber-100 text-amber-800",
  R: "bg-blue-100 text-blue-800",
  A: "bg-green-100 text-green-800",
  X: "bg-rose-100 text-rose-800",
  C: "bg-slate-100 text-slate-600",
};

export const EMPLOYER_STATUSES = ["P", "R", "A", "X"];

export const statusOptionsFor = (status) =>
  EMPLOYER_STATUSES.filter((value) => value !== status).map((value) => ({
    value,
    label: `Mark as ${STATUS_LABELS[value]}`,
  }));

export const applicantName = (applicant) => {
  const name = [applicant?.first_name, applicant?.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();
  return name || applicant?.username || "Applicant";
};
