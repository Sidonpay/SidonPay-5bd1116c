// Centralized mock API facade for dashboard pages
import { fetchPayments as localFetchPayments, fetchPaymentDetail as localFetchPaymentDetail } from './paymentsApi';
import { DISPUTES, getDisputeById } from './disputes.mock.js';
import { REVIEWS, getReviewById } from './reviews.mock.js';
import { USERS, getUserById } from './users.mock.js';
import { makeMonthlySales, makeDeviceTraffic, makeWebsiteTraffic, makeLocationTraffic } from './metrics.mock.js';

const API_BASE = import.meta.env.VITE_API_BASE || '';

async function apiFetch(path, opts = {}){
  if(!API_BASE) return null;
  const url = `${API_BASE.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  try{
    const res = await fetch(url, opts);
    return await res.json();
  }catch(err){
    return { success:false, error: String(err) };
  }
}

const sleep = (ms = 200) => new Promise(r => setTimeout(r, ms));

export async function fetchDisputes({ page = 1, perPage = 15, delayMs = 200 } = {}){
  // if a dev API is configured, proxy the request
  if(API_BASE){
    const resp = await apiFetch(`/api/disputes?page=${page}&perPage=${perPage}`);
    return resp || { success:false, error:'No response' };
  }
  await sleep(delayMs);
  const total = DISPUTES.length;
  const pages = Math.max(1, Math.ceil(total/perPage));
  const start = (page-1)*perPage;
  const items = DISPUTES.slice(start, start+perPage);
  return { success: true, data: { items, page, perPage, total, pages } };
}

export async function fetchDisputeDetail(id, delayMs = 150){
  if(API_BASE){
    const resp = await apiFetch(`/api/disputes/${id}`);
    return resp || { success:false, error:'No response' };
  }
  await sleep(delayMs);
  const item = getDisputeById(id);
  if(!item) return { success: false, error: 'Not found' };
  return { success: true, data: item };
}

export async function fetchReviews({ page = 1, perPage = 15, delayMs = 200 } = {}){
  if(API_BASE){
    const resp = await apiFetch(`/api/reviews?page=${page}&perPage=${perPage}`);
    return resp || { success:false, error:'No response' };
  }
  await sleep(delayMs);
  const total = REVIEWS.length;
  const pages = Math.max(1, Math.ceil(total/perPage));
  const start = (page-1)*perPage;
  const items = REVIEWS.slice(start, start+perPage);
  return { success: true, data: { items, page, perPage, total, pages } };
}

export async function fetchReviewDetail(id){
  if(API_BASE){
    const resp = await apiFetch(`/api/reviews/${id}`);
    return resp || { success:false, error:'No response' };
  }
  await sleep(120);
  const item = getReviewById(id);
  if(!item) return { success:false, error:'Not found' };
  return { success:true, data:item };
}

export async function fetchUsers(){
  if(API_BASE){
    const resp = await apiFetch('/api/users');
    return resp || { success:false, error:'No response' };
  }
  await sleep(120);
  return { success:true, data: USERS };
}

export async function fetchUserDetail(id){
  if(API_BASE){
    const resp = await apiFetch(`/api/users/${id}`);
    return resp || { success:false, error:'No response' };
  }
  await sleep(120);
  const item = getUserById(id);
  if(!item) return { success:false, error:'Not found' };
  return { success:true, data:item };
}

export async function fetchMetrics(){
  if(API_BASE){
    const resp = await apiFetch('/api/metrics');
    return resp || { success:false, error:'No response' };
  }
  await sleep(120);
  return {
    success:true,
    data: {
      monthlySales: makeMonthlySales(),
      deviceTraffic: makeDeviceTraffic(),
      websiteTraffic: makeWebsiteTraffic(),
      locationTraffic: makeLocationTraffic(),
    }
  }
}

// when configured, proxy payment-related calls to dev server
export async function fetchPayments(opts){
  if(API_BASE){
    const q = new URLSearchParams();
    if(opts?.status) q.set('status', opts.status);
    if(opts?.search) q.set('search', opts.search);
    if(opts?.page) q.set('page', String(opts.page));
    if(opts?.perPage) q.set('perPage', String(opts.perPage));
    const resp = await apiFetch(`/api/payments?${q.toString()}`);
    return resp || { success:false, error:'No response' };
  }
  return await localFetchPayments(opts);
}

export async function fetchPaymentDetail(id){
  if(API_BASE){
    const resp = await apiFetch(`/api/payments/${id}`);
    return resp || { success:false, error:'No response' };
  }
  return await localFetchPaymentDetail(id);
}
