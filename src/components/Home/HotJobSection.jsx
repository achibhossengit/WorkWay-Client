import JobsContainer from '../Jobs/JobsContainer';

const demoJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    employer: "Tech Solutions Ltd.",
    category: 2,
    published_at: "2025-06-15T10:00:00.000Z",
    details: {
      description: "Develop and maintain web applications using React and Tailwind CSS.",
      workplace: "R", // R = Remote, H = Hybrid, O = On-site
      status: "F", // F = Full-time, P = Part-time
      locations: "Dhaka, Bangladesh",
      min_salary: 50000,
      deadline: "2025-07-01T23:59:59.000Z"
    },
    requirements: {
      education: "Bachelor's in Computer Science",
      experience: 2,
      skill: "React, JavaScript, CSS, HTML"
    }
  },
  {
    id: 2,
    title: "Data Analyst",
    employer: "Insight Analytics",
    category: 3,
    published_at: "2025-06-18T15:30:00.000Z",
    details: {
      description: "Analyze complex datasets to generate actionable insights for clients.",
      workplace: "H",
      status: "F",
      locations: "Chittagong, Bangladesh",
      min_salary: 60000,
      deadline: "2025-06-30T23:59:59.000Z"
    },
    requirements: {
      education: "Master's in Statistics",
      experience: 3,
      skill: "Python, SQL, Excel, Power BI"
    }
  },
  {
    id: 3,
    title: "UI/UX Designer",
    employer: "Creative Minds Agency",
    category: 5,
    published_at: "2025-06-12T09:00:00.000Z",
    details: {
      description: "Design user-friendly interfaces and enhance user experiences.",
      workplace: "O",
      status: "P",
      locations: "Sylhet, Bangladesh",
      min_salary: 40000,
      deadline: "2025-06-25T23:59:59.000Z"
    },
    requirements: {
      education: "Diploma in Graphic Design",
      experience: 1,
      skill: "Figma, Adobe XD, Photoshop, Illustrator"
    }
  },
  {
    id: 4,
    title: "Software Engineer",
    employer: "NextGen Coders",
    category: 4,
    published_at: "2025-06-14T12:00:00.000Z",
    details: {
      description: "Develop backend services using Node.js and Express.",
      workplace: "H",
      status: "F",
      locations: "Khulna, Bangladesh",
      min_salary: 70000,
      deadline: "2025-07-10T23:59:59.000Z"
    },
    requirements: {
      education: "Bachelor's in Software Engineering",
      experience: 4,
      skill: "Node.js, Express, MongoDB, REST API"
    }
  },
  {
    id: 5,
    title: "Marketing Specialist",
    employer: "Global Reach",
    category: 6,
    published_at: "2025-06-10T08:00:00.000Z",
    details: {
      description: "Develop and implement marketing strategies for various campaigns.",
      workplace: "R",
      status: "P",
      locations: "Remote",
      min_salary: 45000,
      deadline: "2025-06-28T23:59:59.000Z"
    },
    requirements: {
      education: "Bachelor's in Business Administration",
      experience: 2,
      skill: "Digital Marketing, SEO, Google Ads, Content Writing"
    }
  }
];


const HotJobSection = ({jobs=demoJobs}) => {
    return (
        <div>
            <JobsContainer jobs={jobs}/>
        </div>
    );
};

export default HotJobSection;