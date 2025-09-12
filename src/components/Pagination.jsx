import React from "react";
import { ArrowLeft, ArrowRight, Ellipsis } from "lucide-react";
import PropTypes from "prop-types";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  // Example: show first 3, ellipsis, last 3
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i <= 3 || i > totalPages - 3) {
      pages.push({ type: "page", value: i, key: `page-${i}` });
    } else if (i === 4) {
      pages.push({ type: "ellipsis", key: "ellipsis" });
    }
  }

  return (
    <div
      className={`sticky bottom-0 left-0 bg-base_white flex justify-between items-center px-2 pt-4 pb-2 border-t w-full text-xs ${className}`}
    >
      <button
        className="flex md:w-24 justify-center items-center gap-2 px-2 py-1 border rounded-lg group"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 duration-300" />
        <span className="hidden md:block">Previous</span>
      </button>
      <div className="flex">
        {pages.map((pageObj) =>
          pageObj.type === "ellipsis" ? (
            <div
              key={pageObj.key}
              className="w-10 h-10 flex justify-center items-center rounded-lg"
            >
              <Ellipsis size={14} />
            </div>
          ) : (
            <div
              key={pageObj.key}
              className={`w-10 h-10 flex justify-center items-center cursor-pointer rounded-lg ${
                currentPage === pageObj.value ? "bg-button bg-opacity-10" : ""
              }`}
              onClick={() => onPageChange(pageObj.value)}
            >
              {pageObj.value}
            </div>
          )
        )}
      </div>
      <button
        className="flex md:w-24 justify-center items-center gap-2 px-2 py-1 border rounded-lg group"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <span className="hidden md:block">Next</span>
        <ArrowRight className="group-hover:translate-x-0.5 duration-300" size={14} />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Pagination;