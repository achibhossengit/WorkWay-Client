import { useCallback, useState } from "react";

export const PAGE_SIZE = 10;

export const listFrom = (data) =>
  Array.isArray(data) ? data : data?.results || [];

export const totalPagesFrom = (data, pageSize = PAGE_SIZE) => {
  if (Array.isArray(data)) {
    return data.length > 0 ? 1 : 0;
  }
  return Math.ceil((data?.count || 0) / pageSize);
};

export const countFrom = (data) => {
  if (Array.isArray(data)) return data.length;
  return data?.count || 0;
};

/** Server-side page state helpers for dashboard lists. */
const useServerPagination = (initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPage, setTotalPage] = useState(0);

  const applyPageData = useCallback((data) => {
    setTotalPage(totalPagesFrom(data));
    return listFrom(data);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    totalPage,
    setTotalPage,
    applyPageData,
    handlePageChange,
    resetPage,
  };
};

export default useServerPagination;
