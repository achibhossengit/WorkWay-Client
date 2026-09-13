import TotalCards from "./TotalCards";
import Filter from "../Filter/Filter";

const FilterSection = ({ categories, handleSearch }) => {
  return (
    <div
      className="w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(30, 58, 138, 0.8)), url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')",
      }}
    >
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Find Your Dream Job
          </h1>
          <p className="text-base text-blue-100 md:text-lg">
            Browse thousands of job listings to find your perfect match
          </p>
        </div>

        <TotalCards />

        <div className="mx-auto max-w-6xl">
          <Filter categories={categories} handleSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
