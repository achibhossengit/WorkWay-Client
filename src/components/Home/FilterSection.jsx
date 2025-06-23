import TotalCards from "./TotalCards";
import Filter from "../Filter/Filter";

const demoCategories = [
  { id: 1, title: "General", description: "Various job categories" },
  { id: 2, title: "Doctors", description: "Medical professionals" },
  { id: 3, title: "Salesman", description: "Sales and marketing roles" },
  {
    id: 4,
    title: "Engineering",
    description: "Technical and engineering jobs",
  },
  { id: 5, title: "Education", description: "Teaching and academic positions" },
];

const FilterSection = ({ categories = demoCategories }) => {
  return (
    <div
      className="w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(30, 58, 138, 0.8)), url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')",
      }}
    >
      <div className="max-w-7xl space-y-5 mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Find Your Dream Job
          </h1>
          <p className="text-gray-200">
            Browse thousands of job listings to find your perfect match
          </p>
        </div>

        <TotalCards />

        <Filter categories={categories}/>
      </div>
    </div>
  );
};

export default FilterSection;
