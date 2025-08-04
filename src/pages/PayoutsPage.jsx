import React from 'react'
import { AnimatePresence, motion } from "motion/react";

const PayoutsPage = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <div className="px-3 md:px-6 overflow-y-auto">
          <div className="flex py-8 justify-between">
            <h1 className="font-inter text-4xl font-bold text-brand_color2">
              Payouts
            </h1>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default PayoutsPage
