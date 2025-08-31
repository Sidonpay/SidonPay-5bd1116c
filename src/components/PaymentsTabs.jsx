import React from "react";
import {
  allPayments,
  refundedPayments,
  successfulPayments,
  uncapturedPayments,
} from "./PaymentLists";
import PaymentsTable from "./PaymentsTable";

export const PaymentsTabs = [
  { id: "successful_tab", label: "Successful" },
  { id: "refunded_tab", label: "Refunded" },
  { id: "uncaptured_tab", label: "Uncaptured" },
  { id: "all_tab", label: "All" },
];

export const PaymentsTabContent = {
  successful_tab: <PaymentsTable paymentType={successfulPayments} />,
  refunded_tab: <PaymentsTable paymentType={refundedPayments} />,
  uncaptured_tab: <PaymentsTable paymentType={uncapturedPayments} />,
  all_tab: <PaymentsTable paymentType={allPayments} />,
};
