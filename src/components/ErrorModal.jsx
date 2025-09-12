import React from "react";

const ErrorModal = ({ visible, onClose }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-[#2D7A51] bg-opacity-60">
      <div className="bg-white rounded-xl shadow-lg p-4 w-[320px] flex flex-col items-center">
        <div className="text-gray-700 text-center mb-6 text-sm">Please select both start and end dates</div>
        <button onClick={onClose} className="bg-green-700 text-white px-6 py-2 rounded text-sm">Close</button>
      </div>
    </div>
  );
};

export default ErrorModal;