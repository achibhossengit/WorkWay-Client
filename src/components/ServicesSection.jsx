import { FiAward, FiBriefcase, FiCheckCircle, FiUsers } from "react-icons/fi";

const ServicesSection = () => {
  const services = [
    {
      icon: <FiBriefcase className="text-3xl text-blue-600" />,
      title: "Job Matching",
      description: "We connect you with the perfect job opportunities based on your skills and preferences."
    },
    {
      icon: <FiUsers className="text-3xl text-blue-600" />,
      title: "Recruitment Solutions",
      description: "Comprehensive hiring solutions for employers to find the best talent."
    },
    {
      icon: <FiAward className="text-3xl text-blue-600" />,
      title: "Career Guidance",
      description: "Expert advice and resources to help you advance your career."
    },
    {
      icon: <FiCheckCircle className="text-3xl text-blue-600" />,
      title: "Verified Listings",
      description: "All job postings are thoroughly vetted to ensure quality and legitimacy."
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive solutions for both job seekers and employers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;