# SidonPay Backend API Provisioning Guide

## Goal

This repository already defines a first-pass admin API contract through:

- `mock-server/index.js`
- `src/data/adminApi.js`
- `src/data/paymentsApi.js`
- the consuming pages in `src/pages`

This guide is for the backend developer provisioning the first real SidonPay admin API so the frontend can stop relying on in-memory mocks.

## Current integration model

The frontend uses `VITE_API_BASE` as the API origin.

- If `VITE_API_BASE` is set, `src/data/adminApi.js` calls `${VITE_API_BASE}/api/...`
- If `VITE_API_BASE` is empty, the frontend falls back to local mock data in `src/data/*.mock.js`
- The mock server runs at `http://localhost:3333` by default

For the smoothest first integration, keep the real API compatible with the current `/api/*` paths and response envelopes.

## Response conventions the frontend already expects

Most routes expect this envelope:

```json
{
  "success": true,
  "data": {}
}
```

Error responses are usually handled as:

```json
{
  "success": false,
  "error": "Not found"
}
```

Paginated list endpoints are expected to return:

```json
{
  "success": true,
  "data": {
    "items": [],
    "page": 1,
    "perPage": 15,
    "total": 0,
    "pages": 1
  }
}
```

Recommended compatibility rules:

- Use ISO 8601 timestamps for all `createdAt` or date-time fields
- Preserve enum casing used by the frontend
- Return monetary values in minor units consistently where possible
- Allow CORS from local frontend origins during development

## Provisioning priority

Provision these in this order:

1. Payments
2. Metrics
3. Disputes
4. Reviews
5. Users
6. Auth
7. Create payment and payouts

That order matches what the current dashboard relies on most.

## Route inventory

| Area | Route | Used today | Priority | Notes |
| --- | --- | --- | --- | --- |
| Payments | `GET /api/payments` | Yes | High | Powers payment processing page |
| Payments | `GET /api/payments/:id` | Yes | High | Used by helper layer |
| Payments | `DELETE /api/payments/:id` | Yes | High | Used by payment processing page |
| Disputes | `GET /api/disputes` | Yes | Medium | List view only today |
| Disputes | `GET /api/disputes/:id` | Yes | Medium | Helper exists, useful for detail page later |
| Reviews | `GET /api/reviews` | Yes | Medium | List view only today |
| Reviews | `GET /api/reviews/:id` | Expected | Medium | Helper exists; now included in mock server |
| Users | `GET /api/users` | Yes | Medium | Used by users page |
| Users | `GET /api/users/:id` | Expected | Medium | Helper exists |
| Metrics | `GET /api/metrics` | Yes | High | Used by overview dashboard charts |
| Auth | `POST /api/auth/login` | Not wired yet | Medium | Replaces mocked login logic |
| Auth | `GET /api/auth/verify` | Not wired yet | Medium | Replaces mocked token validation |
| Auth | `POST /api/auth/logout` | Not wired yet | Low | Replaces mocked logout |
| Auth | `POST /api/auth/forgot-password` | Not wired yet | Low | Frontend is still mocked |
| Auth | `POST /api/auth/reset-password` | Partially wired | Medium | Current frontend already posts here |
| Payments | `POST /api/payments` | Not wired yet | Next phase | Create payment form exists but does not submit yet |
| Payouts | `GET /api/payouts` and related | Not wired yet | Later | Payouts page is still static |

## Payments contract

### `GET /api/payments`

Query parameters:

- `status`: `ALL`, `SUCCEEDED`, `REFUNDED`, `UNCAPTURED`
- `search`: free text
- `page`: number
- `perPage`: number

Current search behavior in the mock server matches against:

- `id`
- `description`
- `customerName`
- `reference`

Current sort behavior:

- descending by `createdAt`

Example response:

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "SP-000001",
        "amountKobo": 90000000,
        "currency": "NGN",
        "status": "SUCCEEDED",
        "description": "Invoice 6B1E73DA-0001",
        "customerName": "Olumide Ademola Babajide",
        "createdAt": "2025-12-25T17:10:22.000Z",
        "senderName": "Olumide Ademola Babajide",
        "recipientName": "Ayodele Okunola",
        "recipientBank": "GTBank",
        "recipientAccount": "1234567890",
        "reference": "6B1E73DA00001S2CV6JKW3512345678",
        "transferFeeKobo": 0,
        "narration": "Sidonpay from: Olumide Ademola Babajide to: Ayodele Okunola: 6B1E73DA00001S2CV6JKW3512345678",
        "receiptUrl": "/receipts/SP-000001.pdf",
        "canDownloadReceipt": true,
        "canRefund": true,
        "canCapture": false
      }
    ],
    "page": 1,
    "perPage": 15,
    "total": 120,
    "pages": 8
  }
}
```

Fields the UI depends on immediately:

- `id`
- `amountKobo`
- `status`
- `description`
- `customerName` or `senderName`
- `createdAt`

Fields worth keeping because they appear in the mock model and are likely needed for details/receipts:

- `currency`
- `recipientName`
- `recipientBank`
- `recipientAccount`
- `reference`
- `transferFeeKobo`
- `narration`
- `receiptUrl`
- `canDownloadReceipt`
- `canRefund`
- `canCapture`

### `GET /api/payments/:id`

Return the same payment object shape as list items.

Not found:

```json
{
  "success": false,
  "error": "Not found"
}
```

### `DELETE /api/payments/:id`

Current UI expects a successful delete to return:

```json
{
  "success": true,
  "data": {
    "id": "SP-000001"
  }
}
```

The mock server currently returns the full deleted object. That is fine and backward-compatible.

## Disputes contract

### `GET /api/disputes`

Query parameters:

- `page`
- `perPage`

Example item:

```json
{
  "id": "DP-000001",
  "amount": 540000,
  "currency": "NGN",
  "reason": "Fraudulent transaction",
  "status": "OPEN",
  "createdAt": "2026-03-14T09:30:00.000Z",
  "transactionId": "SP-000245",
  "customer": {
    "name": "Aisha Bello",
    "email": "user0001@example.com"
  },
  "notes": ""
}
```

Status values currently used by the mock:

- `OPEN`
- `IN_REVIEW`
- `RESOLVED`
- `REJECTED`

Important note:

- The disputes page divides `amount` by `100`, so the current UI treats this as a minor-unit amount even though the field is named `amount`
- For a real API, either keep that behavior for compatibility or standardize later with a frontend update

### `GET /api/disputes/:id`

Return the same object shape as list items.

## Reviews contract

### `GET /api/reviews`

Query parameters:

- `page`
- `perPage`

Example item:

```json
{
  "id": "RV-000001",
  "rating": 4,
  "text": "Great service, quick payout",
  "createdAt": "2026-02-01T12:00:00.000Z",
  "user": {
    "id": "U-00001",
    "name": "Akin"
  },
  "resolved": false
}
```

### `GET /api/reviews/:id`

The helper layer expects this route even though the current UI only renders the list page.

Return the same object shape as list items.

## Users contract

### `GET /api/users`

This route currently returns an array instead of a paginated object:

```json
{
  "success": true,
  "data": [
    {
      "id": "U-00001",
      "name": "Super Admin",
      "email": "superadmin@sidonpay.com",
      "role": "super_admin"
    }
  ]
}
```

Current roles present in the mock:

- `super_admin`
- `admin`
- `analyst`
- `support`

### `GET /api/users/:id`

Return a single user object.

## Metrics contract

### `GET /api/metrics`

Example response:

```json
{
  "success": true,
  "data": {
    "monthlySales": [
      { "month": "Jan", "sales": 12000 }
    ],
    "deviceTraffic": [
      { "site": "iOS", "traffic": 32000 }
    ],
    "websiteTraffic": [
      { "site": "Google", "traffic": 62000 }
    ],
    "locationTraffic": [
      { "location": "Lagos", "traffic": 52000 }
    ]
  }
}
```

This endpoint is read-only and currently only powers dashboard charts.

## Auth contract

Auth is still mostly mocked in `src/contexts/AuthContext.jsx`, but the backend can provision these now so frontend wiring becomes straightforward.

### Recommended `POST /api/auth/login`

Suggested request:

```json
{
  "email": "admin@sidonpay.com",
  "password": "password123"
}
```

Suggested response:

```json
{
  "success": true,
  "data": {
    "token": "jwt-or-session-token",
    "user": {
      "id": "U-00002",
      "name": "Admin User",
      "email": "admin@sidonpay.com",
      "role": "admin",
      "permissions": [
        "view_dashboard",
        "view_payments",
        "manage_payments"
      ]
    }
  }
}
```

### Recommended `GET /api/auth/verify`

Suggested response:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "U-00002",
      "name": "Admin User",
      "email": "admin@sidonpay.com",
      "role": "admin",
      "permissions": [
        "view_dashboard",
        "view_payments",
        "manage_payments"
      ]
    }
  }
}
```

### Recommended `POST /api/auth/logout`

Suggested response:

```json
{
  "success": true
}
```

### `POST /api/auth/reset-password`

This route is already called by the frontend.

Current frontend expectation:

- success HTTP status with a JSON body containing `message`
- failure HTTP status with a JSON body containing `message`

Example:

```json
{
  "message": "Password reset successful"
}
```

### `POST /api/auth/forgot-password`

Not wired yet, but recommended for next auth pass.

Suggested request:

```json
{
  "email": "admin@sidonpay.com"
}
```

Suggested response:

```json
{
  "success": true,
  "data": {
    "message": "Reset email sent"
  }
}
```

## Create payment contract

The create-payment page exists, but it currently only stores form values locally and logs them on submit.

Current form fields are:

- `recipientname`
- `recipient-email`
- `payment-amount`
- `payment-reason`
- `payment-invoice`
- `payment-method`

These names are UI-form names, not a recommended backend payload.

Suggested backend-facing payload when this is wired:

```json
{
  "recipientName": "Ayodele Okunola",
  "recipientContact": "ayodele@example.com",
  "amountKobo": 5000000,
  "reason": "Vendor settlement",
  "invoiceId": "INV-1024",
  "paymentMethod": "bank_transfer"
}
```

Recommended route:

- `POST /api/payments`

Return the newly created payment in the same canonical shape used by `GET /api/payments/:id`.

## Known frontend and mock gaps

These are worth knowing before backend integration starts:

1. `PaymentProcessingPage.jsx` deletes via a hardcoded relative path: `fetch('/api/payments/:id')`
2. `AllTransactionsPage.jsx` imports `src/data/paymentsApi.js` directly, so it does not use `VITE_API_BASE`
3. `ReceiptModal.jsx` uses UI-friendly field names like `receiver` and `receiver_bank`, but the canonical mock payment model uses `recipientName` and `recipientBank`
4. `PayoutsPage.jsx` is still backed by static arrays, not API calls
5. Auth login, verify, logout, and forgot-password remain mocked in React context

Because of those gaps, the backend should target the canonical data model from `src/data/*.mock.js`, not temporary UI reshaping done inside page components.

## Recommended backend implementation checklist

1. Stand up `/api/payments`, `/api/payments/:id`, and `/api/metrics`
2. Match the current success and pagination envelopes exactly
3. Keep payment status enums as `SUCCEEDED`, `REFUNDED`, `UNCAPTURED`
4. Return ISO timestamps
5. Allow local CORS for the frontend dev server
6. Add `/api/disputes`, `/api/reviews`, and `/api/users`
7. Add auth routes, starting with `login`, `verify`, and `reset-password`
8. Align with frontend on whether create payment belongs under `payments`, `transfers`, or `payouts`

## Local verification flow

Once a real backend is available:

1. Start the backend locally
2. Run the frontend with `VITE_API_BASE` pointing at the backend origin
3. Confirm these pages load against real data:
   - Overview
   - Payment Processing
   - Disputes
   - Reviews
   - Users
4. Confirm payment delete behavior
5. Confirm reset-password behavior

If you need a compatibility baseline, compare the real API against `mock-server/index.js` first, then against the consuming code in `src/data/adminApi.js`.
