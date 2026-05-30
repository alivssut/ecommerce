import React from 'react';
import styles from './PaginationComponent.module.css';

const PaginationComponent = ({ count, currentPage, contentPerPage, onPageChange }) => {
  const totalPages = Math.ceil(count / contentPerPage);

  // Return null if there are no pages or only one page
  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    const delta = 2;
    const pages = [];
    const current = parseInt(currentPage, 10);

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    const rangeStart = Math.max(2, current - delta);
    const rangeEnd = Math.min(totalPages - 1, current + delta);

    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      pages.push('...');
    } else if (rangeStart === 2) {
      pages.push(2);
    }

    // Add pages in the middle range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // Add ellipsis before last page if needed
    if (rangeEnd < totalPages - 1) {
      pages.push('...');
    } else if (rangeEnd === totalPages - 1 && totalPages > 2) {
      pages.push(totalPages - 1);
    }

    // Always show last page if totalPages > 1
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    // Remove duplicates while preserving order
    return [...new Set(pages)];
  };

  const handlePageClick = (page) => {
    if (page === '...' || page === currentPage) return;
    const pageNum = parseInt(page, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
    }
  };

  const pageNumbers = generatePageNumbers();

  return (
    <nav aria-label="Page navigation">
      <ul className={styles.pagination}>
        {/* First Page */}
        <li className={`${styles.pageItem} ${currentPage === 1 ? styles.disabled : ''}`}>
          <button
            type="button"
            className={styles.pageLink}
            onClick={() => handlePageClick(1)}
            disabled={currentPage === 1}
            aria-label="First page"
          >
            &laquo;
          </button>
        </li>

        {/* Previous Page */}
        <li className={`${styles.pageItem} ${currentPage === 1 ? styles.disabled : ''}`}>
          <button
            type="button"
            className={styles.pageLink}
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            &lsaquo;
          </button>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <li
            key={`${page}-${index}`}
            className={`${styles.pageItem} ${currentPage === page ? styles.active : ''} ${
              page === '...' ? styles.disabled : ''
            }`}
          >
            <button
              type="button"
              className={styles.pageLink}
              onClick={() => handlePageClick(page)}
              disabled={page === '...'}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Next Page */}
        <li className={`${styles.pageItem} ${currentPage === totalPages ? styles.disabled : ''}`}>
          <button
            type="button"
            className={styles.pageLink}
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            &rsaquo;
          </button>
        </li>

        {/* Last Page */}
        <li className={`${styles.pageItem} ${currentPage === totalPages ? styles.disabled : ''}`}>
          <button
            type="button"
            className={styles.pageLink}
            onClick={() => handlePageClick(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Last page"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;