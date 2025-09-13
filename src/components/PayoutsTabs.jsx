import React from "react";
import PayoutsTable from "./PayoutsTable";
import {
  allPayouts,
  successfulPayouts,
  pendingPayouts,
  refundedPayouts,
  failedPayouts,
} from "./PayoutsLists"; // You will create this file for mock data

export const PayoutsTabs = [
  { id: "all_tab", label: "All Payments" },
  { id: "successful_tab", label: "Successful" },
  { id: "pending_tab", label: "Pending" },
  { id: "refunded_tab", label: "Refunded" },
  { id: "failed_tab", label: "Failed" },
];

export const PayoutsTabContent = {
  all_tab: <PayoutsTable payoutType={allPayouts} />,
  successful_tab: <PayoutsTable payoutType={successfulPayouts} />,
  pending_tab: <PayoutsTable payoutType={pendingPayouts} />,
  refunded_tab: <PayoutsTable payoutType={refundedPayouts} />,
  failed_tab: <PayoutsTable payoutType={failedPayouts} />,
};