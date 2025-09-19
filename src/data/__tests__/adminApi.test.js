import { describe, it, expect } from 'vitest'
import { fetchDisputes, fetchDisputeDetail, fetchReviews, fetchUsers, fetchMetrics } from '../adminApi'

describe('adminApi mock', ()=>{
  it('fetchDisputes returns list shape', async ()=>{
    const res = await fetchDisputes({ perPage: 5, page: 1 })
    expect(res.success).toBe(true)
    expect(res.data).toHaveProperty('items')
    expect(Array.isArray(res.data.items)).toBe(true)
  })

  it('fetchDisputeDetail returns not found for bad id', async ()=>{
    const res = await fetchDisputeDetail('BAD_ID')
    expect(res.success).toBe(false)
    expect(res).toHaveProperty('error')
  })

  it('fetchReviews returns list and fetchUsers returns users array', async ()=>{
    const rev = await fetchReviews({ perPage: 3 })
    expect(rev.success).toBe(true)
    expect(Array.isArray(rev.data.items)).toBe(true)

    const users = await fetchUsers()
    expect(users.success).toBe(true)
    expect(Array.isArray(users.data)).toBe(true)
  })

  it('fetchMetrics returns expected keys', async ()=>{
    const m = await fetchMetrics()
    expect(m.success).toBe(true)
    expect(m.data).toHaveProperty('monthlySales')
    expect(m.data).toHaveProperty('deviceTraffic')
    expect(m.data).toHaveProperty('websiteTraffic')
    expect(m.data).toHaveProperty('locationTraffic')
  })
})
