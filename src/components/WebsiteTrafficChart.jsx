import React from 'react'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const WebsiteTrafficChart = ({ data }) => {

    const fallback = [
      { site: "Google", traffic: 60 },
      { site: "Youtube", traffic: 40 },
      { site: "Instagram", traffic: 35 },
      { site: "TikTok", traffic: 30 },
      { site: "Facebook", traffic: 32 },
      { site: "Twitter", traffic: 25 },
    ];
    const chartData = data && data.length ? data : fallback;


  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        layout="vertical" // ← switch to horizontal bars
        margin={{ left: 15, top: 20 }}
        barSize={5}
      >
        <XAxis type="number" tickLine={false} axisLine={false} tick={false} />
        <YAxis
          dataKey="site"
          type="category"
          tickLine={false}
          axisLine={false}
          tick={{
            textAnchor: "start",
            fontSize: 13,
            fill: "#151E31",
          }}
          tickMargin={68}
        />
        <Bar dataKey="traffic" fill="#555E71" radius={30} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default WebsiteTrafficChart
