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
    { name: "Jan", this_year: 13500, last_year: 11500 },
    { name: "Feb", this_year: 8000, last_year: 10600 },
    { name: "Mar", this_year: 10000, last_year: 18000 },
    { name: "Apr", this_year: 13000, last_year: 6000 },
    { name: "May", this_year: 25000, last_year: 12000 },
    { name: "Jun", this_year: 28000, last_year: 21000 },
    { name: "Jul", this_year: 21000, last_year: 24000 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%" className="select-none">
      <AreaChart accessibilityLayer data={data}>
        <YAxis tickLine={false} tickCount={3} tickMargin={8} />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={true}
          tickMargin={12}
        />
        <Area
          type="natural"
          stroke="#000000"
          fill="#8d8d8d"
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
