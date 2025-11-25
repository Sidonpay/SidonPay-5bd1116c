import React from "react";
import PropTypes from "prop-types";
import { Check, AlertTriangle, XCircle, Ellipsis } from "lucide-react";

function getStatusBadge(status) {
  if (status === "SUCCEEDED") {
    return {
      className: "text-[#119C2B] bg-[#EBFFF1]",
      icon: <Check size={18} strokeWidth={3} />,
      label: "Successful",
    };
  }
  if (status === "REFUNDED") {
    return {
      className: "text-warning bg-[#FFE9E2]",
      icon: <AlertTriangle size={18} strokeWidth={3} />,
      label: "Refunded",
    };
  }
  if (status === "UNCAPTURED") {
    return {
      className: "text-error bg-[#FFE3E5]",
      icon: <XCircle size={18} strokeWidth={3} />,
      label: "Uncaptured",
    };
  }
  return {
    className: "text-secondary bg-[#F5F5F5]",
    icon: <Ellipsis size={18} strokeWidth={3} />,
    label: status || "Pending",
  };
}

const PaymentsTable = ({ paymentType, onInvoiceClick }) => (
  <table className="text-xs/10 min-w-full table-auto mb-1">
    <thead>
      <tr className="text-mid_gray text-left">
        <th className="font-semibold px-3 md:px-4">Amount</th>
        <th className="font-semibold px-3 text-center md:px-4">Status</th>
        <th className="font-semibold px-3 md:px-4">Description</th>
        <th className="font-semibold px-3 md:px-4">Customer</th>
        <th className="font-semibold px-3 md:px-4">Date</th>
        <th className="font-semibold px-3 md:px-4">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y">
      {paymentType.map((item, index) => {
        const badge = getStatusBadge(item.status);
        const amount =
          typeof item.amountKobo === "number"
            ? (item.amountKobo / 100).toLocaleString("en-NG", {
                style: "currency",
                currency: item.currency || "NGN",
              })
            : "₦0.00";

        const date =
          item.createdAt && !isNaN(new Date(item.createdAt))
            ? new Date(item.createdAt).toLocaleString("en-NG")
            : "—";

        return (
          <tr key={item.id || index} className="text-brand_color2 whitespace-nowrap">
            <td className="px-3 md:px-4">{amount}</td>
            <td className="px-3 md:px-4">
              <div
                className={`flex items-center text-xs w-fit mx-auto px-2 py-1 rounded-md font-bold gap-1 ${badge.className}`}
              >
                {badge.icon} {badge.label}
              </div>
            </td>
            <td
              className="px-3 md:px-4 hover:underline cursor-pointer"
              onClick={() => onInvoiceClick(item)}
            >
              {item.description || "—"}
            </td>
            <td className="px-3 md:px-4">{item.customerName || "—"}</td>
            <td className="px-3 md:px-4">{date}</td>
            <td className="px-3 md:px-4">
              <button
                className="flex w-fit mx-auto"
                onClick={() => onInvoiceClick(item)}
                aria-label="View Details"
              >
                <Ellipsis size={20} className="text-brand_color2" />
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

PaymentsTable.propTypes = {
  paymentType: PropTypes.array.isRequired,
  onInvoiceClick: PropTypes.func,
};

export default PaymentsTable;
