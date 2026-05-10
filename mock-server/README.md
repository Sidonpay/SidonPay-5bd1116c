# SidonPay Mock Server

This Express server exposes the same `/api/*` routes the admin dashboard expects during local development.

It is backed by the in-repo mock generators in `src/data`, so the responses stay close to the current frontend contract.

## Run locally

From the repository root:

```bash
npm run mock:server
```

Or from inside `mock-server/`:

```bash
npm install
node index.js
```

Default server URL:

```text
http://localhost:3333
```

## Frontend integration

Point the frontend at the mock server with:

```bash
VITE_API_BASE=http://localhost:3333 npm run dev
```

Or run both together:

```bash
npm run dev:with-mock
```

## Routes

- `GET /api/payments?status=ALL&page=1&perPage=15&search=invoice`
- `GET /api/payments/:id`
- `DELETE /api/payments/:id`
- `GET /api/disputes`
- `GET /api/disputes/:id`
- `GET /api/reviews`
- `GET /api/reviews/:id`
- `GET /api/users`
- `GET /api/users/:id`
- `GET /api/metrics`

## Backend handoff

For the backend provisioning guide based on this mock contract, see:

- `mock-server/BACKEND_API_PROVISIONING_GUIDE.md`

## Notes

- The mock server imports data from `src/data/*.mock.js`
- `src/data/adminApi.js` is the main compatibility layer the frontend uses when `VITE_API_BASE` is set
- Some app areas are still frontend-only placeholders; the guide above calls those out explicitly
