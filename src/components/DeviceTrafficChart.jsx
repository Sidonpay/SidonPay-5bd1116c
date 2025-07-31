import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell } from "recharts";

const DeviceTrafficChart = () => {
  const chartData = [
    { site: "Linux", traffic: 18000 },
    { site: "Mac", traffic: 28000 },
    { site: "iOS", traffic: 21000 },
    { site: "Windows", traffic: 30000 },
    { site: "Android", traffic: 10000 },
    { site: "Other", traffic: 25000 },
  ];

  const SLICE_COLORS = [
    "#9F9FF8",
    "#96E2D6",
    "#000000",
    "#92BFFF",
    "#AEC7ED",
    "#94E9B8",
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} barSize={35}>
        <XAxis
          type="category"
          dataKey="site"
          tickLine={false}
          axisLine={false} tickMargin={10}
        />
        <YAxis
        tickLine={false} axisLine={false}
          tickCount={4}
          tickMargin={28}
          tickFormatter={(value) =>
            value >= 1000 ? `${Math.round(value / 1000)}K` : value
          }
        />
        <Bar dataKey="traffic" fill="#555E71" radius={8} >
            {chartData.map((entry, index) => (
                        <Cell
                          key={`slice-${entry.site}`}
                          fill={SLICE_COLORS[index % SLICE_COLORS.length]}
                        />
                      ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DeviceTrafficChart;
