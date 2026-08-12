function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav
      className="d-flex justify-content-center mt-5"
      aria-label="صفحه‌بندی محصولات"
    >
      <ul className="pagination mb-0">
        <li
          className={`page-item ${isFirstPage ? "disabled" : ""}`}
        >
          <button
            type="button"
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="صفحه قبل"
          >
            <i className="bi bi-chevron-right" />
          </button>
        </li>

        {pages.map((page) => {
          const isCurrentPage = page === currentPage;

          return (
            <li
              key={page}
              className={`page-item ${
                isCurrentPage ? "active" : ""
              }`}
            >
              <button
                type="button"
                className="page-link"
                onClick={() => onPageChange(page)}
                aria-current={
                  isCurrentPage ? "page" : undefined
                }
              >
                {page}
              </button>
            </li>
          );
        })}

        <li
          className={`page-item ${isLastPage ? "disabled" : ""}`}
        >
          <button
            type="button"
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="صفحه بعد"
          >
            <i className="bi bi-chevron-left" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
