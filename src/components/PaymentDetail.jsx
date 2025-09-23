import { Check, Ellipsis } from "lucide-react";
import PropTypes from "prop-types";
import React from "react";
import { useState } from "react";

const PaymentDetail = ({
  amount,
  status,
  detailsClick,
  desc,
  customer,
  date,
  onHide,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <tr className="text-brand_color2 whitespace-nowrap">
      <td className="hidden">
        <input type="checkbox" name="checkbox" id="checkbox" />
      </td>
      <td className="px-3 md:px-4 min-w-fit">
        {typeof amount === "number"
          ? amount.toLocaleString("en-US")
          : amount != null
          ? String(amount)
          : "—"}
      </td>
      <td className="px-3 md:px-4">
        <div
          className={`flex items-center text-xs w-fit mx-auto px-2 py-1 rounded-md font-bold gap-1 ${
            status == "Successful"
              ? "text-[#119C2B] bg-[#EBFFF1]"
              : status == "Refunded"
              ? "text-warning bg-[#FFE9E2]"
              : status == "Uncaptured"
              ? "text-error bg-[#FFE3E5]"
              : ""
          } `}
        >
          <Check size={18} strokeWidth={3} /> {status}
        </div>
      </td>
      <td
        className="px-3 md:px-4 hover:underline cursor-pointer"
        onClick={detailsClick}
      >
        {desc}
      </td>
      <td className="px-3 md:px-4">{customer}</td>
      <td className="px-3 md:px-4">{date}</td>
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
  amount: PropTypes.number,
  status: PropTypes.string,
  detailsClick: PropTypes.func,
  desc: PropTypes.string,
  customer: PropTypes.string,
  date: PropTypes.string,
};

export default PaymentDetail;
