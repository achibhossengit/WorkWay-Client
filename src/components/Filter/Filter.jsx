import { FiSearch } from "react-icons/fi";

const Filter = ({categories, handleSearch}) => {
  return (
      <form onSubmit={handleSearch} className="bg-indigo-950 rounded-lg shadow-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              name="keyword"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none"
              placeholder="Job title, keywords, or company"
            />
          </div>

          <select name="category" className="block w-full sm:w-64 px-3 py-3 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none">
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
  );
};

export default Filter;
