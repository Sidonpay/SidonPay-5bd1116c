import React from "react";
import UsersOverviewChart from "./UsersOverviewChart";
import PayoutsOverviewChart from "./PayoutsOverviewChart";

export const overviewChartsTabs = [
  { id: "tab1", label: "Total Users" },
  { id: "tab2", label: "Total Payouts" },
  { id: "tab3", label: "Reviews Status" },
];

export const overviewChartsTabContent = {
  tab1: <UsersOverviewChart />,
  tab2: <PayoutsOverviewChart />,
  tab3: <div></div>,
};
