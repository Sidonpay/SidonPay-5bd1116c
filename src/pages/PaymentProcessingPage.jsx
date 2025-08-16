import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Ellipsis,
  Funnel,
  Plus,
} from "lucide-react";
import { PaymentsTabs, PaymentsTabContent } from "../components/PaymentsTabs";
import ReceiptModal from "../components/ReceiptModal";

const PaymentProcessingPage = () => {
  const [activePaymentsTab, setActivePaymentsTab] = useState("successful_tab");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="px-3 md:px-6"
      >
        <div className="flex py-8 justify-between items-center">
          <h1 className="font-inter text-xl md:text-2xl lg:text-3xl font-bold text-brand_color2">
            Payment Processing
          </h1>
          <div className="flex gap-1.5 lg:gap-3 xl:gap-6 text-xs">
            <button
              className={`flex items-center px-3 py-1.5 gap-1 border border-light-gray2 rounded-md text-secondary`}
            >
              <Funnel fill="grey" size={14} />
              <span className="hidden md:block">Filter</span>
            </button>
            <button
              className={`flex items-center px-3 gap-1 border border-light-gray2 rounded-md text-secondary`}
            >
              <ArrowUp size={14} />
              <span className="hidden md:block">Export</span>
            </button>
            <button
              className={`flex items-center px-3 gap-1 md:border md:border-light-gray2 bg-button bg-opacity-10 rounded-md hover:bg-button_primary hover:bg-opacity-100 text-brand_color1 font-bold hover:text-white duration-300`}
            >
              <Plus size={14} />
              <span className="hidden md:block">Create payment</span>
            </button>
          </div>
        </div>

        <div className="min-w-0 w-full max-w-full mb-8">
          <div className="flex gap-4 md:gap-8 lg:gap-10 text-brand_color2 border-b mb-4">
            {PaymentsTabs.map((tab) => (
              <button
                key={tab.id}
                className={`text-sm pb-2 border-b-2 duration-300 ${
                  activePaymentsTab === tab.id
                    ? "font-bold border-secondary"
                    : "border-base_gray"
                }`}
                onClick={() => setActivePaymentsTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="w-full max-w-full overflow-x-auto">
            {PaymentsTabContent[activePaymentsTab]}
          </div>

          <div className="sticky bottom-0 left-0 bg-base_white flex justify-between items-center px-2 pt-4 pb-2 border-t w-full text-xs">
            <button className="flex md:w-24 justify-center items-center gap-2 px-2 py-1 border rounded-lg group">
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-0.5 duration-300"
              />
              <span className="hidden md:block">Previous</span>
            </button>
            <div className="flex">
              <div className="w-10 h-10 flex justify-center items-center cursor-pointer rounded-lg bg-button bg-opacity-10">
                1
              </div>
              <div className="w-10 h-10 flex justify-center items-center cursor-pointer rounded-lg">
                2
              </div>
              <div className="hidden w-10 h-10 md:flex justify-center items-center cursor-pointer rounded-lg">
                3
              </div>
              <div className="w-10 h-10 flex justify-center items-center rounded-lg">
                <Ellipsis size={14} />
              </div>
              <div className="w-10 h-10 flex justify-center items-center cursor-pointer rounded-lg">
                6
              </div>
              <div className="w-10 h-10 hidden md:flex justify-center items-center cursor-pointer rounded-lg">
                7
              </div>
              <div className="w-10 h-10 flex justify-center items-center cursor-pointer rounded-lg">
                8
              </div>
            </div>
            <button className="flex md:w-24 justify-center items-center gap-2 px-2 py-1 border rounded-lg group">
              <span className="hidden md:block">Next</span>
              <ArrowRight
                className="group-hover:translate-x-0.5 duration-300"
                size={14}
              />
            </button>
          </div>
        </div>

        <div>
          <ReceiptModal />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentProcessingPage;
