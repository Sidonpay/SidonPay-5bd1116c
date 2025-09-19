// Reviews mock data
const RATINGS = [1,2,3,4,5];
const REVIEW_TEXTS = [
  'Great service, quick payout',
  'App crashed while paying',
  'Customer support was helpful',
  'Incorrect amount shown',
  'Loved the onboarding experience',
];

function rng(seed = 42) {
  let t = seed >>> 0;
  return function() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  }
}

export function makeReviews({ count = 40, seed = 20250625 } = {}){
  const rand = rng(seed);
  const items = [];
  for(let i=1;i<=count;i++){
    items.push({
      id: `RV-${String(i).padStart(6,'0')}`,
      rating: RATINGS[Math.floor(rand()*RATINGS.length)],
      text: REVIEW_TEXTS[Math.floor(rand()*REVIEW_TEXTS.length)],
      createdAt: new Date(Date.now() - Math.floor(rand()*1000*60*60*24*180)).toISOString(),
      user: {
        id: `U-${String(i).padStart(5,'0')}`,
        name: ['Akin','Bintu','Chika','David'][i % 4],
      },
      resolved: rand() > 0.7,
    })
  }
  return items;
}

export const REVIEWS = makeReviews();
export const getReviewById = (id) => REVIEWS.find(r=>r.id===id);
