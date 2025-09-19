import React from "react";
import PaymentsTable from "./PaymentsTable";

// Keep tab ids the same; content will be resolved by parent via API
export const PaymentsTabs = [
  { id: "successful_tab", label: "Successful" },
  { id: "refunded_tab", label: "Refunded" },
  { id: "uncaptured_tab", label: "Uncaptured" },
  { id: "all_tab", label: "All" },
];

// PaymentsTabContent is now a placeholder — pages should fetch via paymentsApi
export const PaymentsTabContent = {
  successful_tab: <PaymentsTable paymentType={[]} />,
  refunded_tab: <PaymentsTable paymentType={[]} />,
  uncaptured_tab: <PaymentsTable paymentType={[]} />,
  all_tab: <PaymentsTable paymentType={[]} />,
};
