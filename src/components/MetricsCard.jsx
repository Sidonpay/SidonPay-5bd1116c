import { TrendingDown, TrendingUp } from "lucide-react";
import React, { useContext } from "react";
import SidebarContext from "../contexts/SidebarContext";
import PropTypes from "prop-types";

const MetricsCard = ({ bgColor, title, value, percent, rising }) => {
  const { open } = useContext(SidebarContext);

  return (
    <>
      <div
        className={`${bgColor} p-4 sm:p-6 lg:p-4 flex flex-col gap-3 rounded-2xl`}
      >
        <h3 className="text-xs text-gray-500">{title}</h3>
        <div className="flex justify-between items-center flex-wrap">
          <p className="text-2xl font-semibold">
            {value.toLocaleString("en-US")}
          </p>
          <div className="flex gap-2 items-center">
            <span
              className={`hidden sm:block ${
                open ? "lg:hidden xl:block" : ""
              } text-xs text-nowrap`}
            >
              <span>{rising ? "+" : "-"}</span>
              {percent} %
            </span>
            <span>
              {rising ? (
                <TrendingUp size={14} color="green" />
              ) : (
                <TrendingDown size={14} color="red" />
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

MetricsCard.propTypes = {
  bgColor: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.number,
  percent: PropTypes.string,
  slope: PropTypes.bool,
};

export default MetricsCard;
