## SidonPay — Components & Project Structure

This document summarizes the major UI components, contexts, data folders, mock-server, run scripts, and conventions used across this repository. It's intended as a quick reference for contributors who want to understand where pieces live and how to add or wire up new components or mock endpoints.

## High-level overview

- Frontend: React + Vite (ESM). UI styling via Tailwind CSS. Charts use Recharts.
- Dev mock API: lightweight Express server in `mock-server/` (re-uses in-repo mock generators under `src/data`).
- State & cross-cutting concerns are handled with React Contexts in `src/contexts/`.

## Important files & folders

- `src/components/` — Reusable UI components. Notable files:
  - `PaymentsTable.jsx` — Main table that renders payment rows and pagination.
  - `PaymentDetail.jsx` — Row detail component; contains action menu (Hide / Delete).
  - `PaymentLists.jsx`, `PayoutsTable.jsx`, `PayoutsTabs.jsx` — payments/payouts listing UI.
  - `LoginForm.jsx`, `ForgotPassword*` — authentication flows and forms.
  - `Sidebar.jsx`, `Header.jsx`, `DashboardLayout.jsx` — navigation and layout.
  - `NotificationsBlock.jsx`, `NotificationMessage.jsx` — in-page notifications.
  - `ConfirmModal.jsx` — reusable modal used for critical confirmations (delete/undo flows).
  - Chart components: `SalesReportChart.jsx`, `WebsiteTrafficChart.jsx`, `UsersOverviewChart.jsx`, etc.

- `src/contexts/` — Cross-cutting state providers. Key contexts:
  - `AuthContext.jsx` — authentication, current user info and token handling.
  - `CurrentPageContext.jsx` — tracks active page/tab for the UI.
  - `NotificationContext.jsx` — centralized in-app notifications (partial integration).
  - `PaymentFormContext.jsx`, `PaymentReceiptContext.jsx` — payment flow state.
  - `SidebarContext.jsx` — sidebar collapsed/open state.
  - `ForgotPasswordContext.jsx` — multi-step forgot-password state.

- `src/pages/` — Page-level containers that compose components and contexts.
  - `OverviewPage.jsx` — dashboard with charts and metrics.
  - `PaymentProcessingPage.jsx` — payments tabs and table; wires `fetchPayments` API and the hide/delete UI.
  - `PayoutsPage.jsx`, `DisputesPage.jsx`, `ReviewsPage.jsx`, `UserProfilePage.jsx` — domain pages.

- `src/data/` — mock generators and small API helpers.
  - `payments.mock.js`, `disputes.mock.js`, `metrics.mock.js` — synthetic data producers used by both the frontend (for unit/mock) and the dev mock-server.
  - `paymentsApi.js` — client-side helper to call backend endpoints (used by components/pages).
  - `statusMeta.js` — status definitions and display metadata.

- `mock-server/` — local Express dev mock server (optional). Key files:
  - `index.js` — main Express app exposing endpoints like `/api/payments`, `/api/payments/:id`, `/api/metrics`, `/api/disputes`, etc.
  - `test-runner.js` — small smoke-test utility for the mock server.

- `public/` — images and static assets.

## How the frontend talks to the API (dev flow)

- In development the project can point to the local mock server by setting `VITE_API_BASE` (see `.env.development`). When present, `src/data/adminApi.js` (or similar API facades) will use `VITE_API_BASE` to call `http://localhost:3333/api/...` instead of using in-process mocks.
- Default dev commands (from `package.json`):

```bash
npm run dev                 # start Vite dev server
npm run mock:server         # start the mock Express server (single-run)
npm run mock:server:dev     # start the mock server with nodemon (auto-reload)
npm run dev:with-mock       # run both mock server and Vite concurrently (recommended for full dev)
npm run mock:server:test    # run the mock-server smoke tests
```

Run `npm run dev:with-mock` to get both the frontend and mock API running together. The dev script sets `VITE_API_BASE=http://localhost:3333` for Vite so client code routes to the mock server.

## Local persistence keys

The app uses a couple of LocalStorage keys to persist ephemeral UI changes during development:

- `SIDONPAY_HIDDEN_PAYMENTS` — array of payment IDs hidden by the user.
- `SIDONPAY_DELETED_PAYMENTS` — array of payment IDs that were deleted (client-synced delete).

These help the UI remember hide/delete actions across refreshes while using the mock server.

## Adding a new component

1. Create a new file in `src/components/` with a descriptive name: `MyThing.jsx` and optional `MyThing.css` (or inline Tailwind classes).
2. Prefer functional components and hooks. Keep props explicit (avoid passing the entire page state).
3. Use Tailwind utility classes for styling. Keep classes readable; extract repeated patterns into small helper components.
4. If the component requires app-level state, add or reuse a Context in `src/contexts/`.
5. Add a small story/example page under `src/pages/` if the component composes into a page.
6. Write a minimal test (if test framework present) or at least manual QA steps under the component file as comments.

Example prop contract for list rows:

- props: { item, onHide, onDelete, onSelect } — keep handlers at the page level and pass callbacks down.

## Adding or changing mock endpoints

1. Open `mock-server/index.js` and add a new route for the endpoint (GET/POST/DELETE etc.). The mock-server is a thin Express app that imports data generators from `src/data/`.
2. When adding new endpoints, return JSON shaped like { success: boolean, data: ... } — many client helpers expect this shape.
3. To run quickly during development, use `npm run mock:server:dev` so the server reloads on file changes.
4. If you're on Windows and editing ESM import paths, the mock server uses file:// imports where necessary to avoid Node ESM path issues.

## API conventions and shapes

- Paginated list endpoints return { success: true, data: { items: [...], page, perPage, total } }.
- Single-item endpoints return { success: true, data: { ...item } }.
- Error responses use { success: false, error: "message" } where helpful.

## Conventions and code style

- Modules use ESM imports/exports.
- React components are function components with hooks (no class components).
- Tailwind is the primary styling mechanism — prefer utility classes to one-off CSS, but create small utility components when necessary.
- Keep components small and focused; compose them in pages located in `src/pages/`.

## Troubleshooting & notes

- If the mock server fails to import local modules on Windows, ensure ESM imports use file:// URLs or verify Node version >= 16 with proper ESM support.
- Port collisions: the mock server uses port `3333` by default. If you see `EADDRINUSE`, ensure no other process listens on 3333 or update the mock-server port in `mock-server/index.js`.
- If a UI delete/hide doesn't persist, check the LocalStorage keys listed above.

## Quick contact & next steps for contributors

- Want a server-side undo/restore endpoint? Open a draft PR updating `mock-server/index.js` and the page-level handlers to call the new endpoint.
- For protected-branch housekeeping (branch deletions), contact a repo admin — branch protection prevents automated deletion from CI or local pushes.

---

If anything here is unclear or you want a short `HOWTO` for a specific task (add chart, add endpoint, add page), tell me which task and I will add a short step-by-step section.
