import React from "react";

export default function AccessDeniedModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#2D7A51] bg-opacity-60">
      <div className="bg-white rounded-md shadow-lg w-[340px] px-6 py-8 flex flex-col items-center">
        <h2 className="text-sm font-bold mb-1 text-center text-[#D32F2F]">Access Denied</h2>
        <p className="text-gray-700 text-center mb-6 text-xs">
          You&apos;re not authorized to log in. Please contact your admin or check your credentials.
        </p>
        <button
          type="button"
          className="w-full py-2 px-4 rounded bg-[#256B3B] text-white font-semibold text-base transition hover:bg-[#1C5130] focus:outline-none"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}