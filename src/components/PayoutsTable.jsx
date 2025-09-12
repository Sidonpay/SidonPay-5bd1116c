import React from "react";
import PropTypes from "prop-types";
import { Check, AlertTriangle, XCircle, Ellipsis } from "lucide-react";

function getStatusBadge(status) {
  if (status === "Successful") {
    return {
      className: "text-[#119C2B] bg-[#EBFFF1]",
      icon: <Check size={18} strokeWidth={3} />,
    };
  }
  if (status === "Refunded") {
    return {
      className: "text-warning bg-[#FFE9E2]",
      icon: <AlertTriangle size={18} strokeWidth={3} />,
    };
  }
  if (status === "Failed") {
    return {
      className: "text-error bg-[#FFE3E5]",
      icon: <XCircle size={18} strokeWidth={3} />,
    };
  }
  if (status === "Pending") {
    return {
      className: "text-secondary bg-[#F5F5F5]",
      icon: <Ellipsis size={18} strokeWidth={3} />,
    };
  }
  return {
    className: "",
    icon: null,
  };
}

const PayoutsTable = ({ payoutType, onDetailsClick }) => (
  <table className="text-xs/10 min-w-full table-auto mb-1">
    <thead>
      <tr className="text-mid_gray text-left">
        <th className="font-semibold px-3 md:px-4">Amount</th>
        <th className="font-semibold px-3 text-center md:px-4">Status</th>
        <th className="font-semibold px-3 md:px-4">Description</th>
        <th className="font-semibold px-3 md:px-4">Customer</th>
        <th className="font-semibold px-3 md:px-4">Payment Method</th>
        <th className="font-semibold px-3 md:px-4">Date</th>
        <th className="font-semibold px-3 md:px-4">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y">
      {payoutType.map((item, index) => {
        const badge = getStatusBadge(item.status);
        return (
          <tr key={index} className="text-brand_color2 whitespace-nowrap">
            <td className="px-3 md:px-4">{item.amount}</td>
            <td className="px-3 md:px-4">
              <div
                className={`flex items-center text-xs w-fit mx-auto px-2 py-1 rounded-md font-bold gap-1 ${badge.className}`}
              >
                {badge.icon} {item.status}
              </div>
            </td>
            <td className="px-3 md:px-4">{item.desc}</td>
            <td className="px-3 md:px-4">{item.customer}</td>
            <td className="px-3 md:px-4">{item.paymentMethod}</td>
            <td className="px-3 md:px-4">{item.date}</td>
            <td className="px-3 md:px-4">
              <button
                className="flex w-fit mx-auto"
                onClick={() => onDetailsClick(item)}
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

PayoutsTable.propTypes = {
  payoutType: PropTypes.array.isRequired,
  onDetailsClick: PropTypes.func,
};

export default PayoutsTable;