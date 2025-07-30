import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

const MetricsCard = ({ bgColor, title, value, percent, slope }) => {
  return (
    <>
      <div className={`${bgColor} p-7 flex flex-col gap-3 rounded-2xl`}>
        <h3 className="text-xs text-gray-500">{title}</h3>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold">{value.toLocaleString("en-US")}</p>
          <div className="flex gap-2 items-center">
            <span className={`text-xs`}>
              <span>{slope == "up" ? "+" : "-"}</span>
              {percent} %
            </span>
            <span>
              {slope == "up" ? (
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

export default MetricsCard;
