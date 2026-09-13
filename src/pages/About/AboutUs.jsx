import { Link } from "react-router";
import {
  FaBriefcase,
  FaUsers,
  FaHandshake,
  FaBullseye,
  FaEye,
  FaCheckCircle,
} from "react-icons/fa";

const values = [
  {
    icon: <FaHandshake className="text-3xl text-blue-600" />,
    title: "Trust",
    description:
      "Every listing is reviewed so job seekers and employers can connect with confidence.",
  },
  {
    icon: <FaUsers className="text-3xl text-blue-600" />,
    title: "People first",
    description:
      "We design WorkWay around real hiring needs — clear profiles, fair applications, honest feedback.",
  },
  {
    icon: <FaCheckCircle className="text-3xl text-blue-600" />,
    title: "Opportunity",
    description:
      "Whether you are starting out or hiring a team, we make the next step simpler to find.",
  },
];

const AboutUs = () => {
  return (
    <div>
      <div
        className="w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(30, 58, 138, 0.8)), url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            About WorkWay
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            A job platform that connects ambitious job seekers with employers
            who are ready to hire.
          </p>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
              <FaBullseye className="text-3xl text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Make hiring straightforward. Job seekers can build a profile,
                discover roles, and apply in a few steps. Employers can post
                jobs, review applications, and find the right people without the
                usual noise.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
              <FaEye className="text-3xl text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                A trusted workplace where talent and opportunity meet — local
                first, open to every skill level, and built so both sides leave
                with a clear next step.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Who we serve</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Two sides of the same hiring story
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <FaBriefcase className="text-3xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Job seekers
              </h3>
              <p className="text-gray-600 mb-4">
                Create a free account, complete your profile, and apply to
                verified openings. Track applications and grow with reviews from
                employers.
              </p>
              <Link
                to="/jobs"
                className="inline-flex text-blue-600 font-medium hover:text-blue-700"
              >
                Browse jobs →
              </Link>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <FaUsers className="text-3xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Employers
              </h3>
              <p className="text-gray-600 mb-4">
                Post roles, review applicants, and manage hiring from one
                dashboard. Reach candidates who already match what you need.
              </p>
              <Link
                to="/register"
                className="inline-flex text-blue-600 font-medium hover:text-blue-700"
              >
                Post a job →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">What we stand for</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-600 py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to find your next role?
          </h2>
          <p className="text-blue-100 mb-8">
            Join WorkWay and take the next step in your career or hiring plan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/jobs"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Explore jobs
            </Link>
            <Link
              to="/register"
              className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
