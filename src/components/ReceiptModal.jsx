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
                    className="fixed inset-0 z-[100] flex items-stretch justify-end w-full h-screen bg-brand_color2 bg-opacity-70"
                >
                    <div className="
                        bg-base_gray rounded-none w-full max-w-[450px] h-full flex flex-col justify-between items-center
                        px-4 py-8
                        md:px-3 md:py-4
                        lg:px-4 lg:py-6
                        xl:px-6 xl:py-8
                    ">
                        <div className="w-full">
                            <div className="mb-4 text-center">
                                <h2 className="font-bold text-xl md:text-base lg:text-base">
                                    Transaction {paymentReceipt.status}
                                </h2>
                                <p className="text-sm md:text-xs lg:text-xs">
                                    Below are the details of the transaction
                                </p>
                            </div>

                            <table className="text-xs w-full table-fixed mb-1 [&>tbody>tr>td]:py-2 md:[&>tbody>tr>td]:py-1">
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
                                        <td className="font-bold text-right leading-6 text-xs py-0">
                                            {paymentReceipt.narration}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Status</td>
                                        <td>
                                            <div
                                                className={`font-bold text-sm md:text-xs flex items-center justify-end gap-2 ${
                                                    paymentReceipt.status == "Successful"
                                                        ? "text-[#119C2B]"
                                                        : paymentReceipt.status == "Refunded"
                                                        ? "text-warning"
                                                        : paymentReceipt.status == "Uncaptured"
                                                        ? "text-error"
                                                        : ""
                                                }`}
                                            >
                                                <div
                                                    className={`w-3 h-3 md:w-2 md:h-2 ${
                                                        paymentReceipt.status == "Successful"
                                                            ? "bg-[#119C2B]"
                                                            : paymentReceipt.status == "Refunded"
                                                            ? "bg-warning"
                                                            : paymentReceipt.status == "Uncaptured"
                                                            ? "bg-error"
                                                            : ""
                                                    } rounded-full`}
                                                ></div>
                                                {paymentReceipt.status}
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
                            <button className="underline text-xs">Download receipt</button>
                        </div>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

export default ReceiptModal
