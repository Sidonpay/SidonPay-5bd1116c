import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// point to project root
const projectRoot = path.resolve(__dirname, "..");

// import mocks from src/data (convert paths to file:// URLs for ESM loader on Windows)
const paymentsMockUrl = pathToFileURL(
  path.join(projectRoot, "src", "data", "payments.mock.js")
).href;
const disputesMockUrl = pathToFileURL(
  path.join(projectRoot, "src", "data", "disputes.mock.js")
).href;
const reviewsMockUrl = pathToFileURL(
  path.join(projectRoot, "src", "data", "reviews.mock.js")
).href;
const usersMockUrl = pathToFileURL(
  path.join(projectRoot, "src", "data", "users.mock.js")
).href;
const metricsMockUrl = pathToFileURL(
  path.join(projectRoot, "src", "data", "metrics.mock.js")
).href;

// import payments mock data and recreate API helpers here (avoids nested relative imports)
const { PAYMENTS } = await import(paymentsMockUrl);
const sleep = (ms = 200) => new Promise((r) => setTimeout(r, ms));

async function fetchPayments({
  status = "ALL",
  search = "",
  page = 1,
  perPage = 15,
  delayMs = 200,
} = {}) {
  await sleep(delayMs);
  let data = [...PAYMENTS];
  if (status !== "ALL") data = data.filter((p) => p.status === status);
  const q = String(search || "")
    .trim()
    .toLowerCase();
  if (q) {
    data = data.filter((p) => {
      return (
        p.id.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.customerName.toLowerCase().includes(q) ||
        (p.reference || "").toLowerCase().includes(q)
      );
    });
  }
  data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const total = data.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const items = data.slice(start, start + perPage);
  return { success: true, data: { items, page, perPage, total, pages } };
}

async function fetchPaymentDetail(id, delayMs = 200) {
  await sleep(delayMs);
  const item = PAYMENTS.find((p) => p.id === id);
  if (!item) return { success: false, error: "Not found" };
  return { success: true, data: item };
}
const { DISPUTES, getDisputeById } = await import(disputesMockUrl);
const { REVIEWS, getReviewById } = await import(reviewsMockUrl);
const { USERS, getUserById } = await import(usersMockUrl);
const {
  makeMonthlySales,
  makeDeviceTraffic,
  makeWebsiteTraffic,
  makeLocationTraffic,
} = await import(metricsMockUrl);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3333;

app.get("/api/payments", async (req, res) => {
  const { status, search, page, perPage } = req.query;
  const pageNum = page ? Number(page) : undefined;
  const perPageNum = perPage ? Number(perPage) : undefined;
  const payload = await fetchPayments({
    status: status || "ALL",
    search: search || "",
    page: pageNum,
    perPage: perPageNum,
  });
  res.json(payload);
});

app.get("/api/payments/:id", async (req, res) => {
  const payload = await fetchPaymentDetail(req.params.id);
  res.json(payload);
});

app.delete("/api/payments/:id", (req, res) => {
  const id = req.params.id;
  const idx = PAYMENTS.findIndex((p) => p.id === id);
  if (idx === -1)
    return res.status(404).json({ success: false, error: "Not found" });
  const removed = PAYMENTS.splice(idx, 1)[0];
  return res.json({ success: true, data: removed });
});

app.get("/api/disputes", (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const perPage = req.query.perPage ? Number(req.query.perPage) : 15;
  const total = DISPUTES.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const items = DISPUTES.slice(start, start + perPage);
  res.json({ success: true, data: { items, page, perPage, total, pages } });
});

app.get("/api/disputes/:id", (req, res) => {
  const item = getDisputeById(req.params.id);
  if (!item)
    return res.status(404).json({ success: false, error: "Not found" });
  res.json({ success: true, data: item });
});

app.get("/api/reviews", (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const perPage = req.query.perPage ? Number(req.query.perPage) : 15;
  const total = REVIEWS.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const items = REVIEWS.slice(start, start + perPage);
  res.json({ success: true, data: { items, page, perPage, total, pages } });
});

app.get("/api/users", (req, res) => {
  res.json({ success: true, data: USERS });
});

app.get("/api/users/:id", (req, res) => {
  const item = getUserById(req.params.id);
  if (!item)
    return res.status(404).json({ success: false, error: "Not found" });
  res.json({ success: true, data: item });
});

app.get("/api/metrics", (req, res) => {
  res.json({
    success: true,
    data: {
      monthlySales: makeMonthlySales(),
      deviceTraffic: makeDeviceTraffic(),
      websiteTraffic: makeWebsiteTraffic(),
      locationTraffic: makeLocationTraffic(),
    },
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Mock server listening on http://localhost:${PORT}`);
});
