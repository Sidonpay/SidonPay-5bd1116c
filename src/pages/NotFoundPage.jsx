import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
      <div
        className="bg-white rounded-[24px] shadow-lg flex flex-col items-center px-8 py-12"
      >
        {/* SVG Illustration */}
        <svg width="210" height="150" viewBox="0 0 210 150" fill="none" className="mb-8">
          {/* Browser header */}
          <rect x="17" y="18" width="176" height="28" rx="6" fill="#ECF0F3"/>
          {/* Circles */}
          <circle cx="33" cy="33" r="4" fill="#FF6565"/>
          <circle cx="46" cy="33" r="4" fill="#FFE162"/>
          <circle cx="59" cy="33" r="4" fill="#6FCF97"/>
          {/* Browser body */}
          <rect x="17" y="46" width="176" height="90" rx="8" fill="#388942" />
          {/* 404 Text */}
          <text
            x="105"
            y="105"
            textAnchor="middle"
            fontWeight="bold"
            fontSize="56"
            fill="#6FCF97"
            fontFamily="Montserrat, Arial, sans-serif"
            style={{letterSpacing: 6}}
            dominantBaseline="middle"
          >404</text>
          {/* Browser details (bottom left & right dots/lines) */}
          <rect x="36" y="122" width="28" height="4" rx="2" fill="#ECF0F3"/>
          <circle cx="173" cy="129" r="3" fill="#ECF0F3"/>
          <circle cx="184" cy="129" r="3" fill="#ECF0F3"/>
        </svg>
        {/* Text */}
        <h2
          className="text-[20px] font-bold text-center mb-8"
          style={{ color: "#141B34", fontFamily: "Montserrat, Arial, sans-serif" }}
        >
          Looks like you’ve got lost....
        </h2>
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 rounded-[8px] bg-[#256B3B] text-white font-semibold text-base transition "
          style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}