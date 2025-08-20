import React, { useRef, useState } from 'react'
import { AnimatePresence, motion } from "motion/react";
import { Plus, X } from 'lucide-react';


const CreatePaymentPage = () => {
    const [ showForm, setShowForm ] = useState(false);
    const paymentFormRef = useRef(null)
    const [isFormValid, setIsFormValid] = useState(false)

    const handleInputChange = () => {
        setIsFormValid(paymentFormRef.current?.checkValidity() ?? false)

    }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className=" flex flex-col px-3 md:px-6 h-full"
      >
        <div className="flex py-6 justify-between items-center border-b">
          <h1 className="font-inter text-xl md:text-2xl lg:text-3xl font-bold text-brand_color2">
            Create Payment Form
          </h1>
        </div>

        <div className="flex justify-center items-center flex-1 min-w-0 w-full">
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div
                key="trigger"
                initial={{ x: -30, y: -100, opacity: 0, scale: 1 }}
                animate={{ x: 0, y: -100, opacity: 1, scale: 1 }}
                exit={{ x: -30, opacity: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col justify-center items-center gap-3 border border-dashed border-mid_gray rounded-md px-4 py-8 max-w-72 md:max-w-80"
              >
                <p className="text-center text-sm">
                  Add who you're paying, how much, and a few other details, then
                  click submit to get that payment rolling.
                </p>
                <button
                  className="bg-button_primary text-white p-1 rounded-[4px] focus:outline-none"
                  onClick={() => setShowForm(true)}
                >
                  <Plus size={20} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ x: 30, y: -30, opacity: 0, scale: 1 }}
                animate={{ x: 0, y: -30, opacity: 1, scale: 1 }}
                exit={{ x: 30, opacity: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-center items-center gap-10 px-4 py-8 w-full md:w-4/5 max-w-[500px]"
              >
                <form
                  action=""
                  className="flex flex-col gap-4 lg:gap-5 xl:gap-6 w-full"
                  onChange={handleInputChange}
                  ref={paymentFormRef}
                >
                  <input
                    id="recipient-name"
                    className="p-3 rounded-lg bg-base_gray bg-opacity-30 border border-base_gray text-sm placeholder:text-sm text-brand_color2 placeholder:text-secondary outline-none"
                    type="text"
                    name="recipientname"
                    placeholder="Recipient Name / ID"
                    required
                    autoComplete="on"
                  />
                  <input
                    id="recipient-email"
                    className="p-3 rounded-lg bg-base_gray bg-opacity-30 border border-base_gray text-sm placeholder:text-sm text-brand_color2 placeholder:text-secondary outline-none"
                    type="email"
                    name="recipient-email"
                    placeholder="Recipient Email / Phone"
                    required
                    autoComplete="on"
                  />
                  <input
                    id="payment-amount"
                    className="p-3 rounded-lg bg-base_gray bg-opacity-30 border border-base_gray text-sm placeholder:text-sm text-brand_color2 placeholder:text-secondary outline-none"
                    type="text"
                    name="payment-amount"
                    placeholder="Amount (N)"
                    required
                  />
                  <input
                    id="payment-reason"
                    className="p-3 rounded-lg bg-base_gray bg-opacity-30 border border-base_gray text-sm placeholder:text-sm text-brand_color2 placeholder:text-secondary outline-none"
                    type="text"
                    name="payment-reason"
                    placeholder="Payment Reason"
                    required
                  />
                  <input
                    id="payment-invoice"
                    className="p-3 rounded-lg bg-base_gray bg-opacity-30 border border-base_gray text-sm placeholder:text-sm text-brand_color2 placeholder:text-secondary outline-none"
                    type="text"
                    name="payment-invoice"
                    placeholder="Invoice / Order ID (if applicable)"
                  />
                  <input
                    id="payment-method"
                    className="p-3 rounded-lg bg-base_gray bg-opacity-30 border border-base_gray text-sm placeholder:text-sm text-brand_color2 placeholder:text-secondary outline-none"
                    type="text"
                    name="payment-method"
                    placeholder="Payment Method"
                    required
                  />
                </form>
                <div className="flex gap-7 justify-end w-full">
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-sm font-bold text-brand_color2 underline"
                  >
                    Cancel
                  </button>
                  <button type='submit'
                    className={`border border-base_gray w-32 py-2  p-1 rounded-[4px] outline-none disabled:cursor-not-allowed text-sm duration-300 font-bold ${
                      isFormValid
                        ? "bg-brand_color1 text-white"
                        : "bg-button bg-opacity-10 text-brand_color1 text-opacity-70"
                    }`} disabled={!isFormValid}
                  >
                    Preview
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default CreatePaymentPage
