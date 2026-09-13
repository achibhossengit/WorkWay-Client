import { useEffect, useMemo, useState } from "react";

const useClientPagination = (items, pageSize = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = items?.length || 0;
  const totalPage = Math.max(1, Math.ceil(totalItems / pageSize));

  useEffect(() => {
    setCurrentPage(1);
  }, [totalItems]);

  useEffect(() => {
    if (currentPage > totalPage) {
      setCurrentPage(totalPage);
    }
  }, [currentPage, totalPage]);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return (items || []).slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  return {
    currentPage,
    totalPage,
    pageItems,
    handlePageChange: setCurrentPage,
  };
};

export default useClientPagination;
