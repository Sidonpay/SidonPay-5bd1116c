import { describe, it, expect } from 'vitest'
import { fetchPayments, fetchPaymentDetail } from '../paymentsApi'

describe('paymentsApi mock', ()=>{
  it('fetchPayments returns paginated shape', async ()=>{
    const res = await fetchPayments({ status: 'ALL', page: 1, perPage: 5, delayMs: 0 })
    expect(res).toHaveProperty('success', true)
    expect(res).toHaveProperty('data')
    const { items, page, perPage, total, pages } = res.data
    expect(Array.isArray(items)).toBe(true)
    expect(page).toBe(1)
    expect(perPage).toBe(5)
    expect(total).toBeGreaterThanOrEqual(items.length)
    expect(pages).toBeGreaterThanOrEqual(1)
  })

  it('fetchPaymentDetail returns item when exists and not found otherwise', async ()=>{
    const list = await fetchPayments({ perPage: 1, page: 1, delayMs: 0 })
    const id = list.data.items[0].id
    const detail = await fetchPaymentDetail(id, 0)
    expect(detail.success).toBe(true)
    expect(detail.data).toHaveProperty('id', id)

    const missing = await fetchPaymentDetail('NON_EXISTENT_ID', 0)
    expect(missing.success).toBe(false)
    expect(missing).toHaveProperty('error')
  })
})
