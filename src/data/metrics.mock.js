// Metrics and analytics mock data
export function makeMonthlySales(seed = 20250625) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  // deterministic simple pseudo-rng
  let s = seed;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  return months.map(m => ({ month: m, sales: Math.round(10000 + rand()*40000) }));
}

export function makeDeviceTraffic() {
  return [
    { site: 'iOS', traffic: 32000 },
    { site: 'Android', traffic: 28000 },
    { site: 'Windows', traffic: 15000 },
    { site: 'Mac', traffic: 12000 },
    { site: 'Other', traffic: 5000 },
  ];
}

export function makeWebsiteTraffic() {
  return [
    { site: 'Google', traffic: 62000 },
    { site: 'Youtube', traffic: 48000 },
    { site: 'Instagram', traffic: 34000 },
    { site: 'TikTok', traffic: 30000 },
    { site: 'Facebook', traffic: 26000 },
  ];
}

export function makeLocationTraffic() {
  return [
    { location: 'Lagos', traffic: 52000 },
    { location: 'Abuja', traffic: 22000 },
    { location: 'Ibadan', traffic: 18000 },
    { location: 'Other', traffic: 11000 },
  ];
}
