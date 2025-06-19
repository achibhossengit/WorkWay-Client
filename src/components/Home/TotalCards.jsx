import { MdWork, MdPeople, MdBusiness } from "react-icons/md";

const TotalCards = ({
  totalJobseeker = 30,
  totalEmployer = 50,
  totalJobs = 60,
}) => {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
      {/* Jobs Card */}
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-5 hover:shadow-lg transition-shadow duration-300">
        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
          <MdWork className="text-4xl" />
        </div>
        <div>
          <p className="text-gray-600 font-medium">Total Jobs</p>
          <h3 className="text-2xl font-bold text-blue-800">{totalJobs}+</h3>
        </div>
      </div>

      {/* Jobseekers Card */}
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-5 hover:shadow-lg transition-shadow duration-300">
        <div className="p-3 rounded-full bg-green-100 text-green-600">
          <MdPeople className="text-4xl" />
        </div>
        <div>
          <p className="text-gray-600 font-medium">Job Seekers</p>
          <h3 className="text-2xl font-bold text-green-800">
            {totalJobseeker}+
          </h3>
        </div>
      </div>

      {/* Employers Card */}
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-5 hover:shadow-lg transition-shadow duration-300">
        <div className="p-3 rounded-full bg-purple-100 text-purple-600">
          <MdBusiness className="text-4xl" />
        </div>
        <div>
          <p className="text-gray-600 font-medium">Employers</p>
          <h3 className="text-2xl font-bold text-purple-800">
            {totalEmployer}+
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TotalCards;
