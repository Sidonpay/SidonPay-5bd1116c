import React, { useState } from "react";

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

const CalendarOverlay = ({ visible, onClose, onSelect, value }) => {
  const today = value || new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const handleSelect = (day) => {
    onSelect(new Date(year, month, day));
    onClose();
  };

  // Handle left arrow: previous month, or previous year if month is January
  const handlePrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  // Handle right arrow: next month, or next year if month is December
  const handleNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D7A51] bg-opacity-60">
      <div className="bg-white rounded-xl shadow-lg p-4 w-[220px] relative flex flex-col items-center">
        <div className="flex justify-between items-center w-full mb-2">
          <button
            onClick={handlePrev}
            className="p-2 hover:bg-gray-100 rounded"
            aria-label="Previous Month or Year"
          >
            {/* Left arrow icon */}
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 17l-5-5 5-5" />
            </svg>
          </button>
          <span className="font-bold text-xs">
            {new Date(year, month).toLocaleString("default", { month: "long" })} {year}
          </span>
          <button
            onClick={handleNext}
            className="p-2 hover:bg-gray-100 rounded"
            aria-label="Next Month or Year"
          >
            {/* Right arrow icon */}
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17l5-5-5-5" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2 w-full">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i} className="text-xs text-gray-500 text-center">{d}</div>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={i} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => (
            <button
              key={i}
              className={`text-center py-1 rounded hover:bg-green-100 ${
                value &&
                value.getDate() === i + 1 &&
                value.getMonth() === month &&
                value.getFullYear() === year
                  ? "bg-green-700 text-white"
                  : "text-gray-700"
              }`}
              onClick={() => handleSelect(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="flex justify-between w-full mt-4">
          <button onClick={onClose} className="text-green-700 px-4 ">Cancel</button>
          <button onClick={onClose} className="text-green-700 px-4">Ok</button>
        </div>
      </div>
    </div>
  );
};

export default CalendarOverlay;