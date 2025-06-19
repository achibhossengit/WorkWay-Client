import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I apply for jobs on this platform?",
      answer: "Simply create an account, browse available jobs, and click 'Apply Now' on any position you're interested in. You'll be guided through the application process."
    },
    {
      question: "Is there a cost to use this service?",
      answer: "For job seekers, our platform is completely free. Employers may have subscription options for posting jobs and accessing premium features."
    },
    {
      question: "How can I improve my profile visibility?",
      answer: "Complete your profile with detailed information, add relevant skills, and keep your resume updated. The more complete your profile, the better your visibility to employers."
    },
    {
      question: "What industries do you specialize in?",
      answer: "We cover a wide range of industries including technology, healthcare, finance, education, marketing, and more. Our platform serves both general and specialized job markets."
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about our platform
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <button
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                {activeIndex === index ? 
                  <FaChevronUp className="text-gray-500" /> : 
                  <FaChevronDown className="text-gray-500" />}
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-6 pt-2 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection