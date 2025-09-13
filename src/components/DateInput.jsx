import React from "react";

function pad(num) {
  return num < 10 ? `0${num}` : num;
}
function formatDate(date) {
  if (!date) return "";
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

const DateInput = ({ label, value, onClick }) => (
  <div className="flex flex-col mb-3 w-full">
    <label className="text-gray-700 font-medium mb-1 text-sm">{label}</label>
    <div className="relative w-full">
      <input
        type="text"
        className="w-full px-3 py-2 rounded bg-gray-100 focus:outline-none text-sm"
        value={formatDate(value)}
        readOnly
        placeholder="dd/mm/yyyy"
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
        onClick={onClick}
        aria-label={`Open calendar for ${label}`}
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="5" width="14" height="11" rx="2" />
          <path d="M6 2v3M12 2v3M2 9h14" />
        </svg>
      </button>
    </div>
  </div>
);

export default DateInput;