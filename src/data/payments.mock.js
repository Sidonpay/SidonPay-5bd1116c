const BANKS = ["FCMB", "GTBank", "Access Bank", "UBA", "Zenith Bank"];
const SENDERS = [
  "Olumide Ademola Babajide",
  "Kolawole Adebayo",
  "Femi Ogundele",
  "Chioma Okafor",
  "Ibrahim Abdullahi",
];
const RECIPIENTS = [
  "Ayodele Okunola",
  "Blessing Nwosu",
  "Tunde Akinyemi",
  "Fatima Sadiq",
  "Chinedu Eze",
];

const STATUSES = ["SUCCEEDED", "REFUNDED", "UNCAPTURED"];

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const randChoice = (rng, arr) => arr[Math.floor(rng() * arr.length)];
const pad = (n, len = 4) => String(n).padStart(len, "0");
const pickAccount = (rng) => `${Math.floor(1000000000 + rng() * 8999999999)}`;

function makeReference(rng, i) {
  const blocks = ["6B1E73DA", "9F2E55AA", "71CD90BF", "4ACE88FD"];
  const tail = `${Math.floor(10000000 + rng() * 89999999)}`;
  return `${randChoice(rng, blocks)}00${pad(i, 3)}S2CV6JKW35${tail}`;
}

function makeNarration(sender, recipient, ref) {
  return `Sidonpay from: ${sender} to: ${recipient}: ${ref}`;
}

function randomDateBetween(
  rng,
  startIso = "2025-12-21",
  endIso = "2025-12-30"
) {
  const start = new Date(startIso).getTime();
  const end = new Date(`${endIso}T23:59:59`).getTime();
  const ts = start + Math.floor(rng() * (end - start));
  return new Date(ts).toISOString();
}

function kobo(rng, minNaira = 2000, maxNaira = 1500000) {
  const naira = Math.floor(minNaira + rng() * (maxNaira - minNaira));
  return naira * 100;
}

export function makePayments({ count = 120, seed = 20250625 } = {}) {
  const rng = mulberry32(seed);
  const rows = [];
  for (let i = 1; i <= count; i++) {
    const statusRoll = rng();
    const status =
      statusRoll < 0.62
        ? "SUCCEEDED"
        : statusRoll < 0.82
        ? "UNCAPTURED"
        : "REFUNDED";

    const amountKobo = kobo(rng, 50000, 900000);
    const currency = "NGN";

    const senderName = randChoice(rng, SENDERS);
    const recipientName = randChoice(rng, RECIPIENTS);
    const recipientBank = randChoice(rng, BANKS);
    const recipientAccount = pickAccount(rng);
    const reference = makeReference(rng, i);
    const createdAt = randomDateBetween(rng);
    const description = `Invoice 6B1E73DA-${pad(i, 4)}`;
    const customerName = senderName;
    const transferFeeKobo = 0;

    rows.push({
      id: `SP-${pad(i, 6)}`,
      amountKobo,
      currency,
      status,
      description,
      customerName,
      createdAt,

      senderName,
      recipientName,
      recipientBank,
      recipientAccount,
      reference,
      transferFeeKobo,
      narration: makeNarration(senderName, recipientName, reference),
      receiptUrl: `/receipts/SP-${pad(i, 6)}.pdf`,

      canDownloadReceipt: true,
      canRefund: status === "SUCCEEDED",
      canCapture: status === "UNCAPTURED",
    });
  }
  return rows;
}

export const PAYMENTS = makePayments();

export const getPaymentById = (id) => PAYMENTS.find((p) => p.id === id);
export const getPaymentsByStatus = (status) =>
  status === "ALL" ? PAYMENTS : PAYMENTS.filter((p) => p.status === status);
