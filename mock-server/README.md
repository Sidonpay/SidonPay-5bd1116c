# SidonPay Mock Server

This small Express mock server exposes /api/\* endpoints backed by the same in-repo mock generators used by the frontend. It's intended for local development when you want a simple HTTP API to develop against.

How to run

1. Install mock-server deps (from project root):

```bash
cd mock-server
npm install
```

2. Start the server:

```bash
# from project root
npm run mock:server

# or for auto-reload (requires nodemon)
npm run mock:server:dev
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
