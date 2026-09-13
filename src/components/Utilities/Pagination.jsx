const Pagination = ({ currentPage, totalPage, onPageChange, disabled = false }) => {
  if (totalPage <= 1) return null;

  return (
    <div className="mt-6 flex justify-center">
      <div className="join space-x-2">
        {[...Array(totalPage).keys()].map((n) => (
          <button
            key={n}
            type="button"
            disabled={disabled}
            onClick={() => onPageChange(n + 1)}
            className={`join-item btn btn-sm ui-btn-lift rounded-sm ${
              currentPage === n + 1
                ? "bg-blue-600 text-white shadow-md"
                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
            }`}
          >
            {n + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
