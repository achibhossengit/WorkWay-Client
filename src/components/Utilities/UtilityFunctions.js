export const getJobType = (code) => {
  switch (code) {
    case "F":
      return "Full-time";
    case "H":
      return "Part-time";
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
    case "R":
      return "Remote";
    case "Hy":
      return "Hybrid";
    case "O":
      return "On-site";
    default:
      return "Not specified";
  }
};

export const formatSalary = (amount) => {
  return amount ? `৳${amount.toLocaleString()}/month` : "Salary negotiable";
};