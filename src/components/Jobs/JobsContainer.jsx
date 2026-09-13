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
        const res = await apiClient.get(
          `jobseekers/${user.id}/applications/?page_size=100`
        );
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
    <div className="flex flex-wrap justify-center gap-6">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]"
        >
          <JobCard
            job={job}
            hasApplied={appliedJobIds.has(job.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default JobsContainer;
