import React from "react";
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  Tooltip,
  YAxis,
  XAxis,
} from "recharts";

const UsersOverviewChart = () => {
  const data = [
    { month: "Jan", "2025": 13500, "2024": 11500 },
    { month: "Feb", "2025": 8000, "2024": 10600 },
    { month: "Mar", "2025": 10000, "2024": 18000 },
    { month: "Apr", "2025": 13000, "2024": 6000 },
    { month: "May", "2025": 25000, "2024": 12000 },
    { month: "Jun", "2025": 29000, "2024": 21000 },
    { month: "Jul", "2025": 21000, "2024": 24000 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%" className="select-none">
      <AreaChart accessibilityLayer data={data} margin={{ left: 0 }}>
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
          tick={{
            fontSize: 12,
          }}
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={12}
          tick={{
            fontSize: 12,
          }}
        />
        <Area
          type="natural"
          stroke="#000000"
          fill="url(#areaFill)"
          fillOpacity={0.1}
          dataKey="2025"
          axis
        />
        <Area
          type="natural"
          fill="#3a3aff30"
          strokeDasharray="5 5"
          dataKey="2024"
          fillOpacity={0}
        />
        <Tooltip cursor />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default UsersOverviewChart;
