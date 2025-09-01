# SidonPay Git

**Goal:** keep work tidy, reviews simple, and production safe.

**BEFORE YOU START PLEASE NOTE THAT THE REMOTE URL OF THE REPO HAS CHANGED SO DO THE FOLLOWING IMMEDIATELY**

```bash
git remote -v #step 1
git remote set-url origin https://github.com/Sidonpay/SidonPay-5bd1116c.git #step 1
git remote -v #step 1
```

## 🗺️ Branch Map (who works where)

```
nc-joey  ──▶ staging-nc-joey ──▶ main
shorunmu ──▶ staging-shorunmu ──▶ main
```

- **Joey** only pushes to **`nc-joey`** and **`staging-nc-joey`**
- **Shorunmu** only pushes to **`shorunmu`** and **`staging-shorunmu`**
- **main** = production (PRs only; reviewed by @Juadebfm)

> 🔒 You **cannot** push to `main`. You **can** pull from `main` anytime.

---

## 🧭 Golden Rules

- ❌ Don’t push to `main`
- ✅ Do your work on your **own branch**
- 🔁 Keep your branch fresh: `git pull origin main` → resolve → continue
- 🔍 Small PRs > Big PRs (easier to review, faster to ship)
- 📝 PRs need a clear title, short summary, and screenshots if UI

---

## 👩‍💻 Daily Flow (Joey example — same idea for Shorunmu)

1. **Start from main (fresh):**

```bash
git checkout main
git pull origin main
```

2. **Create a short-lived feature branch (optional but recommended):**

```bash
git checkout -b work/fix-transaction-page
```

3. **Code → commit → push:**

```bash
git add -A
git commit -m "fix: fixed form validation when amount is empty"
git push -u origin work/fix-transaction-page
```

4. **Open PR:** `work/fix-transaction-page` → **nc-joey**
   (or push directly to `nc-joey` if allowed — but PRs are nicer to review)

5. **Promote to staging when ready:** open PR **nc-joey → staging-nc-joey**

6. **After review & test, promotion to prod:**
   @Juadebfm opens PR **staging-nc-joey → main** and merges when green.

> For Shorunmu, just replace `nc-joey` with `shorunmu` and `staging-nc-joey` with `staging-shorunmu`.

---

## 🧱 Updating your branch with the latest `main`

When `main` moves ahead and you want those updates:

```bash
git checkout nc-joey        # or shorunmu
git pull --rebase origin main
# fix any conflicts (VS Code merge editor), then:
git push
```

> Tip: `--rebase` keeps history clean and avoids “merge bubbles”.

---

## ✅ PR Checklist (before you click “Create”)

- [ ] Clear title (what & where): `payments: add receipt modal on success`
- [ ] Short description (what changed + why)
- [ ] Screenshots for UI changes
- [ ] Tests pass locally (`npm test` or your command)
- [ ] Self-reviewed the diff (nits removed, dead code gone)
- [ ] No `console.log` left behind (unless intentionally gated)

**PR Template (copy):**

```
## What
Short sentence describing the change.

## Why
The reason or bug/feature this solves.

## How
Key points or approach taken.

## Screenshots (if UI)
<attach here>

## Notes
Anything reviewers should watch out for (migrations, env vars, etc.)
```

---

## 🧩 Naming & Messages (keep it tidy)

**Branches**

- `work/<concise-topic>` (short-lived)
- Long-lived dev branches are fixed: `nc-joey`, `shorunmu`

**Commits**

- Use present tense, prefix with area:

  - `auth: handle expired token on refresh`
  - `payments: add create-payment route`

---

## 🛡️ Protected Branches (what to expect)

- **main**

  - PRs only
  - (Usually) required checks
  - (Usually) Code Owner review: **@Juadebfm**

- **staging-nc-joey / staging-shorunmu**

  - Push/PR allowed **only** by their owner + @Juadebfm

- **nc-joey / shorunmu**

  - Personal dev branches (owner-only + @Juadebfm)

> If you see “Permission denied / Protected branch” — you’re trying to push where you shouldn’t. Switch to **your** branch and push again.

---

## 🆘 Common “Uh-oh” Fixes

**“remote rejected: protected branch”**

- You tried to push to `main`. Create a branch and open a PR instead.

```bash
git switch -c work/hotfix-typo
git push -u origin work/hotfix-typo
# Open PR -> nc-joey or shorunmu (your lane)
```

**“Out of date with main”**

```bash
git pull --rebase origin main
# resolve conflicts, then:
git push
```

**“I can’t push to X branch”**

- You’re in the wrong lane. Joey can’t push to Shorunmu’s branches (and vice versa).

---

## 🔐 (Optional) Signed commits (only needed if required)

If `main` enforces signed commits and you want your local commits signed by default:

```bash
# SSH signing (simple)
ssh-keygen -t ed25519 -C "you@example.com"
git config --global gpg.format ssh
git config --global user.signingkey "~/.ssh/id_ed25519.pub"
git config --global commit.gpgsign true
# Add the public key as a "Signing key" in GitHub (Settings → SSH and GPG keys)
```

---

## 🎯 TL;DR

- Work in **your** branch → promote to **your** staging → @Juadebfm promotes to **main**
- PRs small and clear
- Keep your branch updated with `main`
- Ask early if stuck — small nudge now beats big refactor later 🙌
