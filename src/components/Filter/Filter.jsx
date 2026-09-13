import { FiChevronDown, FiGrid, FiSearch } from "react-icons/fi";

const Filter = ({
  categories,
  keyword,
  category,
  onKeywordChange,
  onCategoryChange,
}) => {
  return (
    <div className="w-full">
      <div className="rounded-2xl border border-gray-200/80 bg-white p-2 shadow-lg shadow-slate-900/10 sm:p-1.5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0">
          <label className="relative flex min-w-0 flex-1 items-center">
            <span className="pointer-events-none absolute left-3.5 text-blue-600">
              <FiSearch className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="sr-only">Job title, keywords, or company</span>
            <input
              type="search"
              value={keyword}
              onChange={(event) => onKeywordChange(event.target.value)}
              autoComplete="off"
              className="w-full rounded-xl border-0 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/25 sm:rounded-lg sm:bg-transparent sm:focus:bg-transparent sm:focus:ring-0"
              placeholder="Search jobs by title, keyword, or company"
            />
          </label>

          <div
            className="mx-1 hidden h-8 w-px shrink-0 bg-gray-200 sm:block"
            aria-hidden="true"
          />

          <label className="relative flex w-full items-center sm:w-56 md:w-64">
            <span className="pointer-events-none absolute left-3.5 text-blue-600">
              <FiGrid className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="sr-only">Category</span>
            <select
              value={category}
              onChange={(event) => onCategoryChange(event.target.value)}
              className="w-full cursor-pointer appearance-none rounded-xl border-0 bg-gray-50 py-3 pl-11 pr-10 text-sm text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/25 sm:rounded-lg sm:bg-transparent sm:focus:bg-transparent sm:focus:ring-0"
            >
              <option value="">All Categories</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
            <FiChevronDown
              className="pointer-events-none absolute right-3 h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
