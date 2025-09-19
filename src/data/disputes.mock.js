// Robust disputes mock generator
const REASONS = [
  'Fraudulent transaction',
  'Customer requested refund',
  'Duplicate charge',
  'Incorrect amount charged',
  'Product not received',
];

const STATUSES = ['OPEN', 'IN_REVIEW', 'RESOLVED', 'REJECTED'];

function seedRng(seed = 12345) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function pad(n, len = 4) {
  return String(n).padStart(len, '0');
}

export function makeDisputes({ count = 36, seed = 20250625 } = {}) {
  const rng = seedRng(seed);
  const rows = [];
  for (let i = 1; i <= count; i++) {
    const id = `DP-${pad(i, 6)}`;
    const amount = Math.floor(1000 + rng() * 900000);
    const reason = REASONS[Math.floor(rng() * REASONS.length)];
    const status = STATUSES[Math.floor(rng() * STATUSES.length)];
    const createdAt = new Date(Date.now() - Math.floor(rng() * 1000 * 60 * 60 * 24 * 90)).toISOString();
    rows.push({
      id,
      amount,
      currency: 'NGN',
      reason,
      status,
      createdAt,
      transactionId: `SP-${pad(Math.floor(rng() * 999999), 6)}`,
      customer: {
        name: ['Aisha Bello','Chinedu Okafor','Samuel Johnson','Fatima Yusuf'][Math.floor(rng()*4)],
        email: `user${pad(i)}@example.com`,
      },
      notes: '',
    });
  }
  return rows;
}

export const DISPUTES = makeDisputes();

export const getDisputeById = (id) => DISPUTES.find((d) => d.id === id);
