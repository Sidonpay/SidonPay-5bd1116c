import { PAYMENTS } from "./payments.mock";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function fetchPayments({
  status = "ALL",
  search = "",
  page = 1,
  perPage = 15,
  delayMs = 250,
  startDate = null,   // ✅ add this
  endDate = null, 
} = {}) {
  await sleep(delayMs);

  let data = [...PAYMENTS];

  if (status !== "ALL") {
    data = data.filter((p) => p.status === status);
  }

  if (startDate && endDate) {
    data = data.filter((p) => {
      const created = new Date(p.createdAt);
      return created >= new Date(startDate) && created <= new Date(endDate);
    });
  }

  const q = search.trim().toLowerCase();
  if (q) {
    data = data.filter((p) => {
      return (
        p.id.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.customerName.toLowerCase().includes(q) ||
        p.reference.toLowerCase().includes(q)
      );
    });
  }

  data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const total = data.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const items = data.slice(start, start + perPage);

  return {
    success: true,
    data: {
      items,
      page,
      perPage,
      total,
      pages,
    },
  };
}

export async function fetchPaymentDetail(id, delayMs = 200) {
  await sleep(delayMs);
  const item = PAYMENTS.find((p) => p.id === id);
  if (!item) return { success: false, error: "Not found" };
  return { success: true, data: item };
}
