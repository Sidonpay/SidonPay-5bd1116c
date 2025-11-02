# SidonPay – Process, Branching & CI/CD

This document consolidates the project's process files: branch policies, developer workflow, and CI/CD pipeline notes. Use this as the single source for how to work with GitHub, branches, and deployments.

## Branching Strategy & Policies

Branch lanes (who works where):

- `new-developer` → `staging-new-developer` → `main`

Rules:

- Do not push directly to `main` (protected).
- Work on your own branch (feature branches) and create PRs to your personal dev branch or staging lanes.
- Small PRs are preferred.

Golden rules:

- ❌ Don’t push to `main`.
- ✅ Do development on your feature branch and PR to `staging` (or your personal lane first).
- Keep your branch updated with `main` (use rebase to keep history clean if preferred).

Example daily flow:

```bash
git checkout main
git pull origin maingit checkout -b feature/short-descriptive-name
# develop
git add .
git commit -m "feat(payments): add payment status badge"
git push -u origin feature/short-descriptive-name
```

PR flow:

- Create PR from `feature/*` → your personal lane (e.g. `new-developer`) or directly to `staging`.
- After review and testing, promote from personal lane → `staging-<owner>` → `main` (by release manager).

Protected branch expectations:

- `main`: PRs only; required checks and code owner reviews (usually @Juadebfm).
- `staging-*` branches: protected and restricted to owners + lead.

## Naming & Commit Conventions

- Branches: `feature/<short-topic>`, `fix/<short-topic>`, `refactor/<short-topic>`
- Commits: use scoped messages, e.g. `auth: handle expired token on refresh`, `payments: add create-payment route`.

## CI/CD Overview (from `.github/workflows/ci-cd.yml`)

The repository contains a GitHub Actions workflow `ci-cd.yml` that performs basic CI and has placeholders for deployment steps.

Triggers:

- Runs on `push` and `pull_request` events for branches: `development`, `staging`, `production`, `main`.

Jobs:

- `test`: checks out code, sets up Node.js 18, installs dependencies, runs `npm run lint`. (Build step is currently commented out.)
- `deploy-dev`, `deploy-staging`, `deploy-production`, `deploy-main`: conditional jobs that run when the corresponding branch is the trigger. These jobs contain placeholder commands and should be filled with real deploy commands (Vercel/Netlify/Heroku/your deploy CLI) and use repository secrets for tokens.

Deployment notes & secrets:

- Add environment secrets in GitHub (Settings → Secrets) such as `VERCEL_TOKEN`, `NETLIFY_AUTH_TOKEN`, or cloud provider keys.
- Replace the placeholder deploy commands in `ci-cd.yml` with the real commands. Example for Vercel (one possible pattern):

```yaml
# Example (not yet in repo):
- name: Deploy to Vercel
  run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }} --confirm
```

## Recommended Enhancements

- Enable the build step in CI (`npm run build`) and fail the pipeline if build fails.
- Add unit/integration tests and run them in CI.
- Add explicit lint and type checks (TypeScript) if/when adopted.
- Add deployment health check steps after deployment.

## PR Checklist

- Clear title and concise description (What, Why, How).
- Screenshots for UI changes.
- No `console.log` left behind.
- Tests (if relevant) pass locally.

## Quick Commands

```bash
# Install
npm install

# Dev server
npm run dev

# Lint
npm run lint

# Run mock server (see mock-server/README.md for details)
npm run mock:server
```

---

If anything in this consolidated process doc is out of date, update this file and the underlying source docs and open a short PR referencing this change.

---

NOTE: Full original `README.md` and branch policy/PR template contents were archived to `ARCHIVE_DOCS.md` in the repository. The archived files contain the complete original text for reference prior to deletion.
