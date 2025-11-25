import { Check, Ellipsis } from "lucide-react";
import PropTypes from "prop-types";
import React, { useState } from "react";

const PaymentDetail = ({
  amountKobo,
  currency,
  status,
  detailsClick,
  description,
  customerName,
  createdAt,
  onHide,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);

  // Convert amount from kobo to NGN string
  const formattedAmount = (amountKobo / 100).toLocaleString("en-NG", {
    style: "currency",
    currency: currency || "NGN",
  });

  // Map backend statuses to UI labels/colors
  const statusMap = {
    SUCCEEDED: { label: "Successful", color: "text-[#119C2B]", bg: "bg-[#EBFFF1]" },
    REFUNDED: { label: "Refunded", color: "text-warning", bg: "bg-[#FFE9E2]" },
    UNCAPTURED: { label: "Uncaptured", color: "text-error", bg: "bg-[#FFE3E5]" },
  };

  const statusInfo = statusMap[status] || { label: status, color: "", bg: "" };

  return (
    <tr className="text-brand_color2 whitespace-nowrap">
      <td className="hidden">
        <input type="checkbox" name="checkbox" id="checkbox" />
      </td>
      <td className="px-3 md:px-4 min-w-fit">{formattedAmount}</td>
      <td className="px-3 md:px-4">
        <div
          className={`flex items-center text-xs w-fit mx-auto px-2 py-1 rounded-md font-bold gap-1 ${statusInfo.color} ${statusInfo.bg}`}
        >
          <Check size={18} strokeWidth={3} /> {statusInfo.label}
        </div>
      </td>
      <td
        className="px-3 md:px-4 hover:underline cursor-pointer"
        onClick={detailsClick}
      >
        {description}
      </td>
      <td className="px-3 md:px-4">{customerName}</td>
      <td className="px-3 md:px-4">
        {new Date(createdAt).toLocaleString("en-NG")}
      </td>
      <td className="px-3 md:px-4">
        <div className="relative flex w-fit mx-auto">
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <Ellipsis size={20} className="text-brand_color2" />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-50 text-xs">
              <button
                className="block px-3 py-2 hover:bg-gray-50 w-full text-left"
                onClick={() => {
                  setOpen(false);
                  onHide && onHide();
                }}
              >
                Hide
              </button>
              <button
                className="block px-3 py-2 hover:bg-gray-50 w-full text-left text-red-600"
                onClick={() => {
                  setOpen(false);
                  onDelete && onDelete();
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

PaymentDetail.propTypes = {
  amountKobo: PropTypes.number.isRequired,
  currency: PropTypes.string,
  status: PropTypes.string.isRequired,
  detailsClick: PropTypes.func,
  description: PropTypes.string,
  customerName: PropTypes.string,
  createdAt: PropTypes.string,
  onHide: PropTypes.func,
  onDelete: PropTypes.func,
};

export default PaymentDetail;
