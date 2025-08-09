import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const LocationTrafficChart = () => {
  const chartData = [
    { location: "Lagos", traffic: 52.1 },
    { location: "Ibadan", traffic: 22.8 },
    { location: "Abuja", traffic: 13.9 },
    { location: "Other", traffic: 11.2 },
  ];
  const SLICE_COLORS = ["url(#topCell)", "#92BFFF", "#94E9B8", "#AEC7ED"];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <linearGradient id="topCell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#000000" stopOpacity={1} />
          <stop offset="80%" stopColor="#1C1C1C" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#000000" stopOpacity={0.6} />
        </linearGradient>
        <Pie
          data={chartData}
          dataKey="traffic"
          cx="34%"
          cy="50%"
          nameKey="location"
          innerRadius={40}
          outerRadius={80}
          paddingAngle={1}
          fill="#82ca9d"
          cornerRadius={6}
          rotate="90d"
          startAngle={90} // ← begin drawing at top (12 o’clock)
          endAngle={450}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`slice-${entry.location}`}
              fill={SLICE_COLORS[index % SLICE_COLORS.length]}
            />
          ))}
        </Pie>
        <Legend
          layout
          align="right"
          verticalAlign="middle"
          iconType="circle"
          iconSize={10}
          formatter={(value) => (
            <span className="text-brand_color2 ml-2 text-xs font-medium">
              {value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default LocationTrafficChart;
