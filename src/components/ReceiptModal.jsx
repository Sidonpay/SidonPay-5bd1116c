import React, { useContext } from "react";
import { PaymentReceiptContext, ShowReceiptContext } from "../contexts/PaymentReceiptContext";
import { AnimatePresence, motion } from "motion/react";

const ReceiptModal = () => {
  const { showReceipt, setShowReceipt } = useContext(ShowReceiptContext);
  const { paymentReceipt } = useContext(PaymentReceiptContext);

  const closeModal = () => {
    setShowReceipt(false);
  };

  if (!paymentReceipt) return null;

  const formattedAmount =
    typeof paymentReceipt.amountKobo === "number"
      ? (paymentReceipt.amountKobo / 100).toLocaleString("en-NG", {
          style: "currency",
          currency: paymentReceipt.currency || "NGN",
        })
      : "₦0.00";

  const statusMap = {
    SUCCEEDED: { label: "Successful", color: "text-[#119C2B]", dot: "bg-[#119C2B]" },
    REFUNDED: { label: "Refunded", color: "text-warning", dot: "bg-warning" },
    UNCAPTURED: { label: "Uncaptured", color: "text-error", dot: "bg-error" },
  };
  const statusInfo = statusMap[paymentReceipt.status] || { label: paymentReceipt.status, color: "", dot: "" };

  const createdAtText =
    paymentReceipt.createdAt && !isNaN(new Date(paymentReceipt.createdAt))
      ? new Date(paymentReceipt.createdAt).toLocaleString("en-NG")
      : "—";

  const transferFeeText =
    typeof paymentReceipt.transferFeeKobo === "number"
      ? `₦${(paymentReceipt.transferFeeKobo / 100).toFixed(2)}`
      : "₦0.00";

  return (
    <AnimatePresence>
      {showReceipt ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-stretch justify-end w-full h-screen bg-brand_color2 bg-opacity-70"
        >
          <div className="bg-base_gray w-full max-w-[450px] h-full flex flex-col justify-between items-center px-4 py-8">
            <div className="w-full">
              <div className="mb-4 text-center">
                <h2 className="font-bold text-xl">Transaction {statusInfo.label}</h2>
                <p className="text-sm">Below are the details of the transaction</p>
              </div>

              <table className="text-xs w-full table-fixed mb-1 [&>tbody>tr>td]:py-2">
                <colgroup>
                  <col className="w-1/2" />
                  <col className="w-1/2" />
                </colgroup>
                <tbody className="divide-y divide-contrast">
                  <tr>
                    <td>Amount:</td>
                    <td className="font-bold text-right">{formattedAmount}</td>
                  </tr>
                  <tr>
                    <td>Sender's Name:</td>
                    <td className="font-bold text-right">{paymentReceipt.senderName || "—"}</td>
                  </tr>
                  <tr>
                    <td>Recipient's Name:</td>
                    <td className="font-bold text-right">{paymentReceipt.recipientName || "—"}</td>
                  </tr>
                  <tr>
                    <td>Recipient's Bank:</td>
                    <td className="font-bold text-right">{paymentReceipt.recipientBank || "—"}</td>
                  </tr>
                  <tr>
                    <td>Recipient's Account:</td>
                    <td className="font-bold text-right">{paymentReceipt.recipientAccount || "—"}</td>
                  </tr>
                  <tr>
                    <td>Transaction Date:</td>
                    <td className="font-bold text-right">{createdAtText}</td>
                  </tr>
                  <tr>
                    <td>Reference:</td>
                    <td className="font-bold text-right">{paymentReceipt.reference || "—"}</td>
                  </tr>
                  <tr>
                    <td>Transfer Fee:</td>
                    <td className="font-bold text-right">{transferFeeText}</td>
                  </tr>
                  <tr>
                    <td>Narration:</td>
                    <td className="font-bold text-right">{paymentReceipt.narration || "—"}</td>
                  </tr>
                  <tr>
                    <td>Status:</td>
                    <td>
                      <div className={`font-bold text-sm flex items-center justify-end gap-2 ${statusInfo.color}`}>
                        <div className={`w-3 h-3 rounded-full ${statusInfo.dot}`}></div>
                        {statusInfo.label}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="w-full flex flex-col items-center">
              <button
                onClick={closeModal}
                className="text-white text-sm md:text-xs bg-button_primary w-full py-2 rounded-xl mb-4"
              >
                Done
              </button>

              {paymentReceipt.receiptUrl ? (
                <a
                  href={paymentReceipt.receiptUrl}
                  download
                  className="underline text-xs"
                >
                  Download receipt
                </a>
              ) : (
                <button className="underline text-xs" disabled>
                  Download receipt
                </button>
              )}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default ReceiptModal;
