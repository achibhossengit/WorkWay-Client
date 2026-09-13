export const getJobType = (code) => {
  switch (code) {
    case "F":
      return "Full-time";
    case "H":
      return "Part-time";
    case "I":
      return "Intern";
    default:
      return "Not specified";
  }
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getWorkplace = (code) => {
  switch (code) {
    case "H":
    case "R":
      return "Home";
    case "Hy":
      return "Hybrid";
    case "O":
      return "Office";
    default:
      return "Not specified";
  }
};

export const formatSalary = (amount) => {
  return amount ? `৳${amount.toLocaleString()}/month` : "Salary negotiable";
};

/** True when the job deadline day is fully over (local time). */
export const isDeadlinePassed = (deadline) => {
  if (!deadline) return false;
  const datePart = String(deadline).slice(0, 10);
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(datePart);
  if (!match) {
    const parsed = new Date(deadline);
    return Number.isNaN(parsed.getTime()) ? false : Date.now() > parsed.getTime();
  }
  const [, year, month, day] = match.map(Number);
  const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);
  return Date.now() > endOfDay.getTime();
};