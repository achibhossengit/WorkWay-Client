export const STATUS_LABELS = {
  P: "Pending",
  R: "Reviewed",
  A: "Accept",
  C: "Cancelled",
};

export const STATUS_STYLES = {
  P: "bg-amber-100 text-amber-800",
  R: "bg-blue-100 text-blue-800",
  A: "bg-green-100 text-green-800",
  C: "bg-rose-100 text-rose-800",
};

export const NEXT_STATUS = {
  P: "R",
  R: "A",
};

export const applicantName = (applicant) => {
  const name = [applicant?.first_name, applicant?.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();
  return name || applicant?.username || "Applicant";
};
