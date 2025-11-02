# SidonPay Mock Server

This small Express mock server exposes /api/\* endpoints backed by the same in-repo mock generators used by the frontend. It's intended for local development when you want a simple HTTP API to develop against.

How to run

1. Install mock-server deps (from project root):

```bash
cd mock-server
npm install
```

Default server URL: http://localhost:3333

Available endpoints (examples):

- GET /api/payments?status=ALL&page=1&perPage=15
- GET /api/payments/:id
- GET /api/disputes
- GET /api/disputes/:id
- GET /api/reviews
- GET /api/users
- GET /api/users/:id
- GET /api/metrics

Notes

- The server imports the repository's mock data generators so the HTTP responses match what the UI expects.
- On Windows the server uses file:// imports to load local modules (handled in the implementation).
  This file has been archived. The authoritative documentation for the project lives in the top-level `README.md` and `PROCESS.md` files.

  If you need the original `mock-server` documentation restored, retrieve it from the Git history or open an issue requesting restoration.
