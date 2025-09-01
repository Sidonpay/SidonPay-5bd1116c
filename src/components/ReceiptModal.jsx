import React, { useContext } from 'react'
import { PaymentReceiptContext, ShowReceiptContext } from '../contexts/PaymentReceiptContext'
import { Circle, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

const ReceiptModal = () => {
    const { showReceipt, setShowReceipt } = useContext(ShowReceiptContext)
    const { paymentReceipt } = useContext(PaymentReceiptContext)

    const closeModal = () => {
        setShowReceipt(false)
    }


  return (
    <AnimatePresence>
      {showReceipt ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`absolute top-0 left-0 flex items-center px-2 lg:px-4 justify-end w-full h-screen bg-brand_color2 bg-opacity-70`}
        >
          <div className="bg-base_gray rounded-lg w-full max-w-[450px] flex flex-col justify-center items-center px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12 xl:py-16">
            <div className="mb-4 text-center">
              <h2 className="text-xl font-bold mb-2">
                Transaction {paymentReceipt.status}
              </h2>
              <p className="text-sm">
                Below are the details of the transaction
              </p>
            </div>

            <table className="text-xs w-ful table-fixed mb-1 [&>tbody>tr>td]:py-2">
              <colgroup>
                <col className="w-1/2" />
                <col className="w-1/2" />
              </colgroup>
              <tbody className="divide-y divide-contrast">
                <tr className="min-h-4">
                  <td>Amount:</td>
                  <td className="font-bold text-right">
                    {paymentReceipt.amount.toLocaleString("en-US")}
                  </td>
                </tr>
                <tr>
                  <td>Sender's Name:</td>
                  <td className="font-bold text-right">
                    {paymentReceipt.customer}
                  </td>
                </tr>
                <tr>
                  <td>Recipient's Name:</td>
                  <td className="font-bold text-right">
                    {paymentReceipt.receiver}
                  </td>
                </tr>
                <tr>
                  <td>Recipient's Bank:</td>
                  <td className="font-bold text-right">
                    {paymentReceipt.receiver_bank}
                  </td>
                </tr>
                <tr>
                  <td>Recipient's Account:</td>
                  <td className="font-bold text-right">
                    {paymentReceipt.receiver_account}
                  </td>
                </tr>
                <tr>
                  <td>Transaction Date:</td>
                  <td className="font-bold text-right">
                    {paymentReceipt.date}
                  </td>
                </tr>
                <tr>
                  <td>Reference:</td>
                  <td className="font-bold text-right">
                    {paymentReceipt.reference}
                  </td>
                </tr>
                <tr>
                  <td>Transfer Fee:</td>
                  <td className="font-bold text-right">
                    {paymentReceipt.fee || "NGN 0.00"}
                  </td>
                </tr>
                <tr>
                  <td>Narration:</td>
                  <td className="font-bold text-right leading-6">
                    {paymentReceipt.narration}
                  </td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>
                    <div
                      className={`font-bold text-lg flex items-center justify-end gap-2 ${
                        paymentReceipt.status == "Successful"
                          ? "text-[#119C2B]"
                          : paymentReceipt.status == "Refunded"
                          ? "text-warning"
                          : paymentReceipt.status == "Uncaptured"
                          ? "text-error"
                          : ""
                      }`}
                    >
                      {" "}
                      <div
                        className={`w-3 h-3 ${
                          paymentReceipt.status == "Successful"
                            ? "bg-[#119C2B]"
                            : paymentReceipt.status == "Refunded"
                            ? "bg-warning"
                            : paymentReceipt.status == "Uncaptured"
                            ? "bg-error"
                            : ""
                        } rounded-full`}
                      ></div>{" "}
                      {paymentReceipt.status}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <button
              onClick={() => closeModal()}
              className="text-white text-sm bg-button_primary w-full py-2 rounded-xl mb-4"
            >
              Done
            </button>
            <button className="underline text-xs">Download receipt</button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default ReceiptModal
