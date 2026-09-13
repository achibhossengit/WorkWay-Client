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