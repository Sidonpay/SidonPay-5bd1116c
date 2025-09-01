# BRANCH_POLICY.md — SidonPay Branch & PR Playbook

> **Goal:** Keep work tidy, reviews simple, and production safe.

## 🗺️ Branch Map (who works where)

```
nc-joey  ──▶ staging-nc-joey ──▶ main
shorunmu ──▶ staging-shorunmu ──▶ main
```

- **Joey** only pushes to **`nc-joey`** and **`staging-nc-joey`**  
- **Shorunmu** only pushes to **`shorunmu`** and **`staging-shorunmu`**  
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
   - Joey: `nc-joey` → `staging-nc-joey`  
   - Shorunmu: `shorunmu` → `staging-shorunmu`
6. **After review & test, promotion to prod:**  
   **@Juadebfm** opens PR **staging-<lane> → main** and merges when green.

---

## 🧱 Keep Your Lane Updated with `main`

```bash
git checkout <your-lane>        # e.g., nc-joey or shorunmu
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
- Long-lived lanes are fixed: `nc-joey`, `shorunmu`

**Commits**
- Present tense, prefix with area:
  - `auth: handle expired token on refresh`
  - `payments: create-payment route`

---

## 🛡️ Protected Branches (what to expect)

- **main**
  - PRs only, required checks, Code Owner review (**@Juadebfm**) as configured
  - Optionally require signed commits
- **staging-nc-joey / staging-shorunmu**
  - Push/PR allowed **only** by their owner + **@Juadebfm**
- **nc-joey / shorunmu**
  - Personal dev branches (owner-only + **@Juadebfm**)

If you see “Permission denied / Protected branch”, you’re pushing to the wrong place.

---

## 🆘 Common Fixes

**“remote rejected: protected branch”**
```bash
git switch -c work/hotfix-typo
git push -u origin work/hotfix-typo
# Open PR -> your lane (nc-joey or shorunmu)
```

**“Branch is out of date with main”**
```bash
git pull --rebase origin main
# resolve conflicts, then:
git push
```

**“I can’t push to X branch”**
- You’re in the wrong lane. Joey can’t push to Shorunmu’s branches (and vice‑versa).

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

- **Lane:** your personal branch (`nc-joey` or `shorunmu`).
- **Staging:** your test/integration branch before `main`.
- **TL;DR:** “Too long; didn’t read” — a short summary of the most important bits.

---

# .github/PULL_REQUEST_TEMPLATE.md — PR Template

> Save this file as `.github/PULL_REQUEST_TEMPLATE.md` so GitHub loads it automatically for every new PR.

```markdown
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

## 📦 Quick Setup Commands (optional)

```bash
# Add the PR template
git checkout main
mkdir -p .github
printf "<paste the template above>\n" > .github/PULL_REQUEST_TEMPLATE.md

# Add/Update the Branch Policy doc
printf "<paste BRANCH_POLICY.md contents>\n" > BRANCH_POLICY.md

git add .github/PULL_REQUEST_TEMPLATE.md BRANCH_POLICY.md
git commit -m "docs: add branch policy and PR template"
git push -u origin main  # or open a PR into main if protected
```

---

**Happy shipping!** If anything here feels confusing in practice, open a tiny PR and we’ll adjust the playbook together.

