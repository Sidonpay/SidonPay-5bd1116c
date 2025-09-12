import React, { useState, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Funnel, ArrowUp, Calendar } from "lucide-react";
import PaymentsTable from "../components/PaymentsTable";
import { allPayments } from "../components/PaymentLists";
import Pagination from "../components/Pagination";
import DateRangeModal from "../components/DateRangeModal";
import ReceiptModal from "../components/ReceiptModal";
import { PaymentReceiptContext, ShowReceiptContext } from "../contexts/PaymentReceiptContext";

const PAGE_SIZE = 20;

const FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Successful", value: "successful" },
  { label: "Uncaptured", value: "uncaptured" },
  { label: "Refunded", value: "refunded" },
];

const AllTransactionsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDateModal, setShowDateModal] = useState(false);

  // Date range state
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  // Filter dropdown state
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  // Receipt modal context
  const { setPaymentReceipt } = useContext(PaymentReceiptContext);
  const { setShowReceipt } = useContext(ShowReceiptContext);

  // Filter payments by date range
  let filteredPayments = allPayments;
  if (dateRange.startDate && dateRange.endDate) {
    filteredPayments = filteredPayments.filter((payment) => {
      const paymentDate = new Date(payment.date);
      return (
        paymentDate >= dateRange.startDate &&
        paymentDate <= dateRange.endDate
      );
    });
  }

  // Filter payments by status
  if (filterStatus !== "all") {
    filteredPayments = filteredPayments.filter(
      (payment) => payment.status?.toLowerCase() === filterStatus
    );
  }

  const totalPages = Math.ceil(filteredPayments.length / PAGE_SIZE);
  const paginatedData = filteredPayments.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleExport = () => {
    alert("Export clicked!");
  };

  const handleDateApply = ({ startDate, endDate }) => {
    setDateRange({ startDate, endDate });
    setCurrentPage(1);
  };

  const handleFilterClick = () => {
    setShowFilterDropdown((prev) => !prev);
  };

  const handleFilterSelect = (value) => {
    setFilterStatus(value);
    setShowFilterDropdown(false);
    setCurrentPage(1);
  };

  // Handle invoice click to show receipt modal
  const handleInvoiceClick = (payment) => {
    setPaymentReceipt(payment);
    setShowReceipt(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <div className="flex min-h-screen">
          <div className="flex-1 px-3 md:px-6 relative">
            <div className="flex py-8 justify-between items-center">
              <h1 className="font-inter text-4xl font-bold text-brand_color2">
                All Transactions
              </h1>
              <div className="flex gap-2 relative">
                <button
                  className="flex items-center"
                  onClick={() => setShowDateModal(true)}
                  aria-label="Select Date"
                >
                  <Calendar size={20} className="text-black" />
                </button>
                <button
                  className="flex items-center px-3 py-1.5 gap-1 border border-base_gray rounded-lg text-secondary text-xs font-semibold"
                  onClick={handleFilterClick}
                >
                  <Funnel size={16} />
                  <span className="hidden md:block">Filter</span>
                </button>
                {/* Filter Dropdown */}
                {showFilterDropdown && (
                  <div className="absolute top-10 right-0 bg-white border rounded shadow-lg z-50 min-w-[140px]">
                    {FILTER_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                          filterStatus === option.value
                            ? "bg-green-100 font-semibold"
                            : ""
                        }`}
                        onClick={() => handleFilterSelect(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
                <button
                  className="flex items-center px-3 py-1.5 gap-1 border border-base_gray rounded-lg text-secondary text-xs font-semibold"
                  onClick={handleExport}
                >
                  <ArrowUp size={16} />
                  <span className="hidden md:block">Export</span>
                </button>
              </div>
            </div>
            <div className="min-w-0 w-full max-w-full mb-8">
              <div className="w-full max-w-full overflow-x-auto">
                <PaymentsTable
                  paymentType={paginatedData}
                  onInvoiceClick={handleInvoiceClick}
                />
              </div>
            </div>
            <div className="sticky bottom-0 left-0 bg-base_white z-20 w-full">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
        <DateRangeModal
          isOpen={showDateModal}
          onClose={() => setShowDateModal(false)}
          onApply={handleDateApply}
        />
        <ReceiptModal />
      </motion.div>
    </AnimatePresence>
  );
};

export default AllTransactionsPage;
