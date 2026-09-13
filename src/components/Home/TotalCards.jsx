import { MdWork, MdPeople, MdBusiness } from "react-icons/md";

const cardClass =
  "ui-card-lift flex items-center gap-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm";

const TotalCards = ({
  totalJobseeker = 30,
  totalEmployer = 50,
  totalJobs = 60,
}) => {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-5 sm:grid-cols-2 lg:grid-cols-3">
      <div className={cardClass}>
        <div className="rounded-full bg-blue-100 p-3 text-blue-600">
          <MdWork className="text-4xl" />
        </div>
        <div>
          <p className="font-medium text-gray-600">Total Jobs</p>
          <h3 className="text-2xl font-bold text-blue-800">{totalJobs}+</h3>
        </div>
      </div>

      <div className={cardClass}>
        <div className="rounded-full bg-green-100 p-3 text-green-600">
          <MdPeople className="text-4xl" />
        </div>
        <div>
          <p className="font-medium text-gray-600">Job Seekers</p>
          <h3 className="text-2xl font-bold text-green-800">
            {totalJobseeker}+
          </h3>
        </div>
      </div>

      <div className={cardClass}>
        <div className="rounded-full bg-purple-100 p-3 text-purple-600">
          <MdBusiness className="text-4xl" />
        </div>
        <div>
          <p className="font-medium text-gray-600">Employers</p>
          <h3 className="text-2xl font-bold text-purple-800">
            {totalEmployer}+
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TotalCards;
