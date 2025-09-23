import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

const SalesReportChart = ({ data }) => {
  const fallback = [
    { month: "Jan", sales: 18000 },
    { month: "Feb", sales: 28000 },
    { month: "Mar", sales: 21000 },
    { month: "Apr", sales: 30000 },
    { month: "May", sales: 10000 },
    { month: "Jun", sales: 25000 },
    { month: "Jul", sales: 18000 },
    { month: "Aug", sales: 28000 },
    { month: "Sep", sales: 21000 },
    { month: "Oct", sales: 30000 },
    { month: "Nov", sales: 10000 },
    { month: "Dec", sales: 25000 },
  ];
  const chartData = data && data.length ? data : fallback;

  const COLORS = [
    "#9F9FF8",
    "#96E2D6",
    "#000000",
    "#92BFFF",
    "#AEC7ED",
    "#94E9B8",
    "#9F9FF8",
    "#96E2D6",
    "#000000",
    "#92BFFF",
    "#AEC7ED",
    "#94E9B8",
  ];

  return (
    <ResponsiveContainer>
      <BarChart data={chartData} barSize={15}>
        <XAxis
          type="category"
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tick={{
            fontSize: 12,
          }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickCount={4}
          tickMargin={28}
          tickFormatter={(value) =>
            value >= 1000 ? `${Math.round(value / 1000)}K` : value
          }
          tick={{
            fontSize: 12,
          }}
        />
        <Bar dataKey="sales" fill="#555E71" radius={8}>
          {chartData.map((entry, index) => (
            <Cell
              key={`slice-${entry.month}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesReportChart;
