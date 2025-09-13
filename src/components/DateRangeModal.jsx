import React, { useState } from "react";
import CalendarOverlay from "./CalendarOverlay";
import DateInput from "./DateInput";
import ErrorModal from "./ErrorModal";

export default function DateRangeModal({ isOpen, onClose, onApply }) {
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleApply = () => {
    if (!startDate || !endDate) {
      setShowError(true);
      return;
    }
    onApply({ startDate, endDate });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#2D7A51] bg-opacity-60">
      {/* Main Modal */}
      <div className="relative bg-white rounded-xl w-[280px] p-4 flex flex-col items-center shadow-xl">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-800 hover:text-gray-500"
          onClick={onClose}
          aria-label="Close Modal"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="6" y1="6" x2="16" y2="16" />
            <line x1="6" y1="16" x2="16" y2="6" />
          </svg>
        </button>
        <h2 className="font-bold text-base mb-4 text-center my-16">Select a date range</h2>
        <DateInput
          label="Start date"
          value={startDate}
          onClick={() => setShowStartCalendar(true)}
        />
        <DateInput
          label="End date"
          value={endDate}
          onClick={() => setShowEndCalendar(true)}
        />
        <button
          className="w-full my-6 bg-green-700 text-white font-semibold py-2 rounded transition hover:bg-green-800 text-sm"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
      {/* Calendar Overlays */}
      <CalendarOverlay
        visible={showStartCalendar}
        value={startDate}
        onClose={() => setShowStartCalendar(false)}
        onSelect={setStartDate}
      />
      <CalendarOverlay
        visible={showEndCalendar}
        value={endDate}
        onClose={() => setShowEndCalendar(false)}
        onSelect={setEndDate}
      />
      {/* Error Modal */}
      <ErrorModal visible={showError} onClose={() => setShowError(false)} />
    </div>
  );
}