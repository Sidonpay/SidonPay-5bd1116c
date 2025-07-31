import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Area,
  AreaChart,
  Tooltip,
  Legend,
  YAxis,
  XAxis,
} from "recharts";

const OverviewChart = () => {
  const data = [
    { month: "Jan", this_year: 13500, last_year: 11500 },
    { month: "Feb", this_year: 8000, last_year: 10600 },
    { month: "Mar", this_year: 10000, last_year: 18000 },
    { month: "Apr", this_year: 13000, last_year: 6000 },
    { month: "May", this_year: 25000, last_year: 12000 },
    { month: "Jun", this_year: 29000, last_year: 21000 },
    { month: "Jul", this_year: 21000, last_year: 24000 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%" className="select-none">
      <AreaChart accessibilityLayer data={data} margin={{left: 0}} >
      <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="2%" stopColor="#000000" stopOpacity={0.9} />
          <stop offset="45%" stopColor="#DEDEDF" stopOpacity={0.1} />
          </linearGradient>
        <YAxis
          tickLine={false}
          axisLine={false}
          axis={false}
          tickCount={4}
          tickMargin={20}
          tickFormatter={(value) =>
            value >= 1000 ? `${Math.round(value / 1000)}K` : value
          }
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={12}
        />
        <Area
          type="natural"
          stroke="#000000"
          fill="url(#areaFill)"
          fillOpacity={0.1}
          dataKey="this_year"
          axis
        />
        <Area
          type="natural"
          fill="#3a3aff30"
          strokeDasharray="5 5"
          dataKey="last_year"
          fillOpacity={0}
        />
        <Tooltip cursor />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default OverviewChart;
