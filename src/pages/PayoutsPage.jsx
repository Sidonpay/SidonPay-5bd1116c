import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Funnel, ArrowUp } from "lucide-react";
import { PayoutsTabs, PayoutsTabContent } from "../components/PayoutsTabs";
import Pagination from "../components/Pagination";

const PayoutsPage = () => {
  const [activeTab, setActiveTab] = useState("all_tab");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Set as needed

  // Dummy handlers for filter and export
  const handleFilter = () => {
    // TODO: Open filter modal or dropdown
    alert("Filter clicked!");
  };

  const handleExport = () => {
    // TODO: Export payout data logic
    alert("Export clicked!");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <div className="flex min-h-screen">
          {/* <Sidebar /> */}
          <div className="flex-1 px-3 md:px-6 relative">
            <div className="flex py-8 justify-between items-center">
              <h1 className="font-inter text-4xl font-bold text-brand_color2">
                Payouts
              </h1>
              <div className="flex gap-2">
                <button
                  className="flex items-center px-3 py-1.5 gap-1 border border-base_gray rounded-lg text-secondary text-xs font-semibold"
                  onClick={handleFilter}
                >
                  <Funnel size={16} />
                  <span className="hidden md:block">Filter</span>
                </button>
                <button
                  className="flex items-center px-3 gap-1 border border-base_gray rounded-lg text-secondary text-xs font-semibold"
                  onClick={handleExport}
                >
                  <ArrowUp size={16} />
                  <span className="hidden md:block">Export</span>
                </button>
              </div>
            </div>
            <div className="min-w-0 w-full max-w-full mb-8">
              <div className="flex gap-4 md:gap-8 lg:gap-10 text-brand_color2 border-b mb-4">
                {PayoutsTabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`text-sm pb-2 border-b-2 duration-300 ${
                      activeTab === tab.id
                        ? "font-bold border-secondary"
                        : "border-base_gray"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="w-full max-w-full overflow-x-auto">
                {PayoutsTabContent[activeTab]}
              </div>
            </div>
            {/* Sticky Pagination Bar at the bottom of main content */}
            <div className="sticky bottom-0 left-0 bg-base_white z-20 w-full">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PayoutsPage;
