import React, { useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { ShowPaymentFormContext, PaymentFormPreviewContext } from "../contexts/PaymentFormContext";
import CreatePaymentForm from "../components/CreatePaymentForm";

const CreatePaymentPage = () => {
  const { showForm, setShowForm } = useContext(ShowPaymentFormContext);
  const { paymentFormPreview } = useContext(PaymentFormPreviewContext);
  

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

        <div className="flex justify-center items-center flex-1 min-w-0 w-full pt-8">
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
                initial={{ x: 30, opacity: 0, scale: 1 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: 30, opacity: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col justify-center items-center gap-10 px-6 w-full md:w-4/5 max-w-[500px] rounded-3xl ${
                  paymentFormPreview
                    ? "bg-base_gray bg-opacity-30 border-base_gray py-8"
                    : ""
                }`}
              >
                <CreatePaymentForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreatePaymentPage;
