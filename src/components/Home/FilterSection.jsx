import React from "react";
import TotalCards from "./TotalCards";
import { FiSearch } from "react-icons/fi";

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

        <form className="bg-indigo-950 rounded-lg shadow-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none"
                placeholder="Job title, keywords, or company"
              />
            </div>

            <select className="block w-full sm:w-64 px-3 py-3 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none">
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="px-6 py-3 cursor-pointer border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none duration-200"
            >
              Search Jobs
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterSection;
