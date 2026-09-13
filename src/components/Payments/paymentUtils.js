import { formatDate } from "../Utilities/UtilityFunctions";

export const FEATURED_PRICE_LABEL = "৳100";

export const isJobFeatured = (job) => Boolean(job?.is_featured);

export const featuredUntilLabel = (job) =>
  job?.featured_until ? formatDate(job.featured_until) : "";
