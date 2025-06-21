import JobCard from "./JobCard";

const JobsContainer = ({ jobs }) => {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job}/>
        ))}
      </div>
  );
};
export default JobsContainer;
