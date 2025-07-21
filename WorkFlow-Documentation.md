# SidonPay Intern Git Workflow Guide

## Overview

This guide explains how to work on the SidonPay dashboard as an intern developer. Follow these steps exactly to ensure proper collaboration and avoid breaking the main codebase.

## Branch Structure

```
main           # Production code (PROTECTED - You cannot push here)
├── staging    # Testing environment (PROTECTED - PRs only)
└── development # Main development branch
    └── feature/your-feature-name  # Your work here
```

## Complete Workflow

### Step 1: Get the Latest Foundation Code

```bash
# Clone the repository (first time only)
git clone https://github.com/Juadebfm/SidonPay-5bd1116c.git
cd SidonPay-5bd1116c

# Always start from main to get latest foundation
git checkout main
git pull origin main

# Install dependencies
npm install
```

### Step 2: Create Your Feature Branch

```bash
# Create feature branch with descriptive name
git checkout -b feature/dashboard-improvements
# Examples:
# git checkout -b feature/login-form-styling
# git checkout -b feature/payments-table-component
# git checkout -b feature/sidebar-responsive-design
# git checkout -b fix/header-navigation-bug
```

### Step 3: Work on Your Feature

```bash
# Start development server
npm run dev

# Make your changes to components, pages, etc.
# Test your work locally

# Stage and commit your changes (commit often!)
git add .
git commit -m "Add: improved dashboard metrics cards styling"

# More commits as you work
git commit -m "Fix: responsive design for mobile"
git commit -m "Update: color scheme to match design"
```

### Step 4: Push Your Feature Branch

```bash
# Push your feature branch (not main!)
git push origin feature/dashboard-improvements

# If first time pushing this branch:
git push -u origin feature/dashboard-improvements
```

### Step 5: Create Pull Request

**IMPORTANT: Always create PR to `staging`, NEVER to `main`**

1. **Go to GitHub repository**
2. **Click "Compare & pull request"** (appears after push)
3. **Set the correct target:**

   - **From:** `feature/dashboard-improvements`
   - **To:** `staging` (NOT main!)

4. **Fill out PR template:**
   - **Title:** Clear description (e.g., "Improve dashboard metrics cards styling")
   - **Description:**
     - What you changed
     - Why you changed it
     - Screenshots (if UI changes)
     - How to test your changes

### Step 6: Wait for Code Review

**What happens next:**

- ✅ Senior developer reviews your code
- ✅ CI/CD runs automatically (tests, linting, etc.)
- ❓ You might get feedback/requests for changes
- ✅ Once approved, your code gets merged

**If changes are requested:**

```bash
# Make the requested changes
# Commit and push to the SAME branch
git add .
git commit -m "Fix: address code review feedback"
git push origin feature/dashboard-improvements
# This automatically updates your existing PR
```

### Step 7: After Merge (Cleanup)

```bash
# Switch back to main
git checkout main

# Pull latest changes (includes your merged work!)
git pull origin main

# Delete your local feature branch (it's merged now)
git branch -d feature/dashboard-improvements

# Delete remote feature branch
git push origin --delete feature/dashboard-improvements
```

## Important Don'ts

**NEVER push directly to main**

```bash
git push origin main  # This will be blocked
```

**NEVER create PR to main**

```bash
# ❌ Wrong: feature/branch → main
# ✅ Correct: feature/branch → staging
```

❌ **NEVER work directly on main**

```bash
git checkout main
# make changes... DON'T DO THIS
```

❌ **NEVER force push**

```bash
git push -f  # This can break everything
```

## Best Practices

### Branch Naming Convention

```bash
feature/login-form-improvements       # New features
fix/sidebar-mobile-responsive         # Bug fixes
update/dashboard-color-scheme         # Updates
refactor/auth-context-cleanup         # Code refactoring
```

### Commit Message Format

```bash
git commit -m "Add: new payment status badges"
git commit -m "Fix: mobile responsive issues in header"
git commit -m "Update: dashboard metrics card colors"
git commit -m "Remove: unused CSS classes"
```

### Before Creating PR Checklist

- [ ] Code works locally (`npm run dev`)
- [ ] No console errors
- [ ] Follows project coding standards
- [ ] Mobile responsive (if UI changes)
- [ ] Added comments for complex logic

## Common Issues & Solutions

### Issue: "Your branch is behind 'origin/main'"

```bash
# Solution: Update your feature branch with latest main
git checkout main
git pull origin main
git checkout feature/your-branch
git rebase main
```

### Issue: "Merge conflicts"

```bash
# Solution: Resolve conflicts manually
git checkout main
git pull origin main
git checkout feature/your-branch
git rebase main
# Fix conflicts in files, then:
git add .
git rebase --continue
```

### Issue: "PR shows too many commits"

```bash
# Solution: Squash commits (ask senior dev for help)
```

## Getting Help

**When stuck:**

1. ✅ Check this guide first
2. ✅ Ask other interns
3. ✅ Check existing components for examples
4. ✅ Ask in team Slack/Discord
5. ✅ Tag senior developer in PR comments

**Daily Standup Questions:**

- What did you work on yesterday?
- What are you working on today?
- Any blockers or questions?

---

**Remember: Quality over speed. It's better to create one well-built feature than many broken ones!** 🚀
