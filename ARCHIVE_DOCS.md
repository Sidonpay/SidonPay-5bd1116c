Archived docs: README.md and sidon_pay_branch_policy_pr_template.md

---

# README.md (archived)

# SidonPay Admin Dashboard

Welcome to the SidonPay Admin Dashboard repository. This README provides a single, maintainable entry point describing the codebase, how to run and develop locally, the mock server, Git workflow, and CI/CD basics.

For process, branching rules, and CI/CD details see `PROCESS.md` (consolidated from the repo's process docs).

## What is this project?

An internal React + Vite admin dashboard for SidonPay staff to manage payments, analytics, payouts, and support workflows. This repository contains the frontend code, a small mock server for local development, and docs describing developer processes.

Important: This repo is for internal use only and should not be exposed publicly.

## Table of Contents

- Quick start
- Project structure
- Development & mock server
- Authentication (local mocks)
- Git workflow & branching (see also `PROCESS.md`)
- CI/CD and deployments
- Contributing
- Useful commands

## Quick start

Prerequisites:

- Node.js 18+
- npm
- Git

Install and run locally:

```bash
git clone <repository-url>
cd SidonPay-5bd1116c
npm install
npm run dev
```

Open http://localhost:5173

## Project structure

Key folders and files:

```
src/
    ├─ components/    # Reusable UI components
    ├─ contexts/      # App contexts (AuthContext.jsx)
    ├─ pages/         # Page components
    ├─ App.jsx        # App entry + routing
    └─ main.jsx       # Vite entry point

mock-server/        # Local mock API used during frontend development
.github/workflows/  # CI/CD workflows
PROCESS.md          # Consolidated process/branching/CI guide
README.md           # This documentation
```

## Development & mock server

The repository ships with a small mock server to emulate backend endpoints for local dev. This is useful while backend APIs are being developed.

Start the mock server (see `mock-server/README.md` for full details):

```bash
# from project root
npm run mock:server

# optional: use nodemon for auto reload
npm run mock:server:dev
```

When using the mock server, set the Vite env variable `VITE_API_BASE` to point the frontend to the mock API. Example (bash):

```bash
export VITE_API_BASE=http://localhost:3333
npm run dev
```

## Authentication (development)

Authentication is implemented using a React context at `src/contexts/AuthContext.jsx`. Currently the app uses mocked users for development. Mock accounts (do not use in production):

- `superadmin@sidonpay.com` / `password123` — Super Admin (full permissions)
- `admin@sidonpay.com` / `password123` — Admin (manage payments)
- `analyst@sidonpay.com` / `password123` — Analyst (read-only metrics)

Notes:

- Tokens and user data are stored in localStorage while mocked. Replace the mocked login logic with API calls when backend is ready.
- Remove or guard mock credentials before any public deployment.

## Git workflow & branching

We use a protected-branch model. High-level rules:

- Do not push to `main` directly.
- Work in short-lived feature branches and open PRs to your staging lane.
- `main` is production and requires reviews and passing checks.

See `PROCESS.md` for a complete consolidation of branch policies, PR checklists, and developer flow.

## CI/CD & Deployments

The repo includes `.github/workflows/ci-cd.yml`. Current behavior:

- On push/PR to `development`, `staging`, `production`, or `main`, the workflow runs linting and (optionally) deployment jobs.
- Deployment steps in the workflow are placeholders and must be filled with your deploy CLI/commands and configured secrets.

Recommendations to finish CI/CD:

- Add a `build` step to CI (uncomment and run `npm run build`).
- Add automated tests and run them in CI.
- Store deploy tokens in GitHub Secrets (e.g., `VERCEL_TOKEN`) and use them in workflow deployments.

## Contributing

1. Fork or create a feature branch from `development`.
2. Keep commits focused and messages clear.
3. Open PR to your staging lane and request reviews.
4. Ensure linter passes (`npm run lint`) and app runs locally.

Follow the contributing guidelines in `PROCESS.md`.

## Useful commands

```bash
# install
npm install

# dev server
npm run dev

# run mock server
npm run mock:server

# lint
npm run lint

# build
npm run build
```

## Where to look next

- `src/contexts/AuthContext.jsx` — authentication & mock users
- `mock-server/` — local API for frontend development
- `.github/workflows/ci-cd.yml` — CI/CD pipeline (needs real deploy commands)
- `PROCESS.md` — consolidated process/branching/CI docs

---

# BRANCH POLICY & PR TEMPLATE (archived)

# BRANCH_POLICY.md — SidonPay Branch & PR Playbook

> **Goal:** Keep work tidy, reviews simple, and production safe.

## 🗺️ Branch Map (who works where)

```
new-developer  ──▶ staging-new-developer ──▶ main
```

- **new developer** pushes to **`new-developer`** and **`staging-new-developer`**
- **main** = production (PRs only; reviewed by **@Juadebfm**)

> 🔒 You **cannot** push to `main`. You **can** pull from `main` anytime.

---

## 🧭 Golden Rules

- ❌ Don’t push to `main`
- ✅ Do your work on **your lane** (your personal branch)
- 🔁 Keep your branch fresh: `git pull --rebase origin main` → resolve → continue
- 🔍 Small PRs > Big PRs (easier to review, faster to ship)
- 📝 PRs need a clear title, short summary, and screenshots/video if UI

---

## 👩‍💻 Daily Flow (replace `<your-lane>` with your branch)

1. **Start from main (fresh):**
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Create a short-lived feature branch (recommended):**
   ```bash
   git checkout -b work/<topic>
   ```
3. **Code → commit → push:**
   ```bash
   git add -A
   git commit -m "<area>: <concise change>"
   git push -u origin work/<topic>
   ```
4. **Open PR:** `work/<topic>` → **`<your-lane>`**  
   (or push directly to `<your-lane>` if allowed — PRs are preferred)
5. **Promote to staging when ready:** open PR **`<your-lane>` → `<your-staging>`**
   - new developer: `new-developer` → `staging-new-developer`
6. **After review & test, promotion to prod:**  
   **@Juadebfm** opens PR **staging-<lane> → main** and merges when green.

---

## 🧱 Keep Your Lane Updated with `main`

```bash
git checkout <your-lane>        # e.g., new-developer
git pull --rebase origin main   # bring latest main on top of your work
# resolve conflicts (VS Code merge editor), then:
git push
```

> Tip: `--rebase` keeps history clean and avoids noisy merge commits.

---

## ✅ PR Checklist (before you click “Create”)

- [ ] Clear title (what & where): `payments: add receipt modal on success`
- [ ] Short description (what changed + why)
- [ ] Screenshots/GIF for UI changes
- [ ] Tests pass locally (`npm test` or your command)
- [ ] Self-reviewed the diff (nits removed, dead code gone)
- [ ] No stray `console.log`
- [ ] If backend/API affects UI, note the contract change

> The PR template below is auto-loaded for new PRs (see `.github/PULL_REQUEST_TEMPLATE.md`).

---

## 🧩 Naming & Messages

**Branches**

- Short-lived: `work/<concise-topic>` (e.g., `work/fix-billing-form`)
- Long-lived lanes are fixed: `new-developer`

**Commits**

- Present tense, prefix with area:
  - `auth: handle expired token on refresh`
  - `payments: create-payment route`

---

## 🛡️ Protected Branches (what to expect)

- **main**
  - PRs only, required checks, Code Owner review (**@Juadebfm**) as configured
  - Optionally require signed commits
- **staging-new-developer**
  - Push/PR allowed **only** by the owner + **@Juadebfm**
- **new-developer**
  - Personal dev branch (owner + **@Juadebfm**)

If you see “Permission denied / Protected branch”, you’re pushing to the wrong place.

---

## 🆘 Common Fixes

**“remote rejected: protected branch”**

```bash
git switch -c work/hotfix-typo
git push -u origin work/hotfix-typo
# Open PR -> your lane (new-developer)
```

**“Branch is out of date with main”**

```bash
git pull --rebase origin main
# resolve conflicts, then:
git push
```

**“I can’t push to X branch”**

- You’re in the wrong lane. A developer must only push to their own lane/branch.

---

## 🔐 Signed Commits (only if required)

```bash
# SSH signing (simple)
ssh-keygen -t ed25519 -C "you@example.com"
git config --global gpg.format ssh
git config --global user.signingkey "~/.ssh/id_ed25519.pub"
git config --global commit.gpgsign true
# Add the public key as a "Signing key" in GitHub (Settings → SSH and GPG keys)
```

---

## 📚 Glossary

- **Lane:** your personal branch (`new-developer`).
- **Staging:** your test/integration branch before `main`.
- **TL;DR:** “Too long; didn’t read” — a short summary of the most important bits.

---

# .github/PULL_REQUEST_TEMPLATE.md — PR Template (archived)

> Save this file as `.github/PULL_REQUEST_TEMPLATE.md` so GitHub loads it automatically for every new PR.

````markdown
## What

A brief, plain-English one-liner of what changed.

## Why

The reason or problem this solves. Link issues if any (e.g., Closes #123).

## How

Key points of the approach. Mention new components, APIs, patterns, or constraints.

## Screenshots / Loom (UI only)

<!-- Drag images here or paste a Loom link. Before/After preferred. -->

## Test Plan

- [ ] Unit tests updated/added
- [ ] Manual check on desktop/mobile
- [ ] Edge cases considered (empty state, loading, error)
- Run locally:
  ```bash
  npm ci
  npm test
  npm run build # optional
  ```
````

## Checklist

- [ ] Self-reviewed the diff
- [ ] No stray `console.log` / `debugger`
- [ ] Follows naming/style conventions
- [ ] Docs/README updated if needed
- [ ] No secrets committed; env vars documented
- [ ] (If required) commits are signed

## Type of change

- [ ] Feature
- [ ] Fix
- [ ] Refactor
- [ ] Docs / Chore
- [ ] CI/CD
- [ ] Breaking change (migration noted below)

## Impact / Migration

Any migrations, data changes, or ops tasks. Rollback plan if relevant.

## Notes for Reviewers

Anything specific you want reviewers to focus on.

```

---

**End of archive**
```
