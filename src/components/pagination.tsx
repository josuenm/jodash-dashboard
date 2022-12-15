import { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  pages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export function Pagination({
  pages,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const totalPages = [];

  for (let i = 2; i < pages; i++) {
    totalPages.push(i);
  }

  const minPages = 1;
  const maxPages = pages;

  const activeStyle = "border-primary text-primary";
  const normalStyle = "border-slate-300 text-slate-600";

  const handlePage = (page: number) => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    setCurrentPage(page);
  };

  return (
    <div className="flex">
      <button
        className={`hidden cursor-default relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 bg-white ${normalStyle}`}
        onClick={() => handlePage(currentPage - 1)}
        disabled={currentPage === minPages}
      >
        <ArrowLeft />
      </button>

      <button
        className={`cursor-default relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 bg-white ${
          currentPage === minPages ? activeStyle : normalStyle
        }`}
        onClick={() => handlePage(minPages)}
      >
        {minPages}
      </button>

      {maxPages > 4 && currentPage - 2 > minPages + 1 && (
        <button
          className={`cursor-default relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 bg-white ${normalStyle}`}
        >
          ...
        </button>
      )}

      {totalPages
        .slice(
          currentPage - 2 <= minPages ? 0 : currentPage - 4,
          currentPage + 2 >= maxPages ? totalPages.length : currentPage
        )
        .map((page) => (
          <button
            className={`cursor-default relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 bg-white ${
              currentPage === page ? activeStyle : normalStyle
            }`}
            onClick={() => handlePage(page)}
            key={page}
          >
            {page}
          </button>
        ))}

      {maxPages > 4 && currentPage < maxPages - 2 && (
        <button
          className={`cursor-default relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 bg-white ${normalStyle}`}
        >
          ...
        </button>
      )}

      <button
        className={`cursor-default relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 bg-white ${
          currentPage === maxPages ? activeStyle : normalStyle
        }`}
        onClick={() => handlePage(maxPages)}
      >
        {maxPages}
      </button>

      <button
        className={`hidden cursor-default relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 bg-white ${normalStyle}`}
        onClick={() => handlePage(currentPage + 1)}
        disabled={currentPage === maxPages}
      >
        <ArrowRight />
      </button>
    </div>
  );
}

function ArrowLeft() {
  return (
    <svg
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}
