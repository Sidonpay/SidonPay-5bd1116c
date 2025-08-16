import { Check, Ellipsis } from "lucide-react";
import PropTypes from "prop-types";
import React from "react";

const PaymentDetail = ({
  amount,
  status,
  detailsClick,
  desc,
  customer,
  date,
}) => {
  return (
    <tr className="text-brand_color2 whitespace-nowrap">
      <td className="hidden">
        <input type="checkbox" name="checkbox" id="checkbox" />
      </td>
      <td className="px-3 md:px-4 min-w-fit">
        {amount.toLocaleString("en-US")}
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
        <div className="flex w-fit mx-auto">
          <Ellipsis size={20} className="text-brand_color2" />
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
