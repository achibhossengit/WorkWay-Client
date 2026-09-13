import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import apiClient from "../../services/ApiClient";
import JobCard from "./JobCard";

const listFrom = (data) =>
  Array.isArray(data) ? data : data?.results || [];

const JobsContainer = ({ jobs }) => {
  const { user } = useContext(AuthContext);
  const [appliedJobIds, setAppliedJobIds] = useState(() => new Set());

  useEffect(() => {
    const loadApplied = async () => {
      if (user?.user_type !== "Jobseeker" || !user?.id) {
        setAppliedJobIds(new Set());
        return;
      }
      try {
        const res = await apiClient.get(`jobseekers/${user.id}/applications/`);
        const ids = listFrom(res.data)
          .filter((application) => application.status !== "C")
          .map((application) => application.job);
        setAppliedJobIds(new Set(ids));
      } catch {
        setAppliedJobIds(new Set());
      }
    };

    loadApplied();
  }, [user?.id, user?.user_type]);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          hasApplied={appliedJobIds.has(job.id)}
        />
      ))}
    </div>
  );
};

export default JobsContainer;
