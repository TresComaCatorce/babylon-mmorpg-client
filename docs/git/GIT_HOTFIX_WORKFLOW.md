# 🧯 Hotfix Workflow

This document describes the workflow for handling urgent fixes in production using `hotfix/*` branches.

---

## 🧩 Branch Overview

- `master`: production branch — must always contain stable, deployed code.
- `development`: main integration branch.
- `hotfix/*`: temporary branches used to fix critical issues in `master`.

---

## 🚨 When to Use a Hotfix Branch

Create a `hotfix/*` branch when:

- A critical bug is found in production.
- The fix cannot wait for the next scheduled release.
- You need to patch `master` immediately and release a new version.

---

## 🔧 Hotfix Branch Workflow

### 1. Create the hotfix branch from `master`

```bash
git checkout master
git pull
git checkout -b hotfix/fix-login-crash
```

> Use a descriptive name for the hotfix.

### 2. Apply the fix and commit

```bash
# Make your changes
git add .
git commit -m "Fix login crash caused by null session token"
```

### 3. Push the hotfix branch and open a PR to `master`

```bash
git push origin hotfix/fix-login-crash
```

> Open a pull request: `hotfix/fix-login-crash` → `master`

Make sure:

- Tests pass
- The fix is isolated and minimal
- You tag the version after merging (see below)

### 4. Tag the release

After merging the PR into `master`, tag the release:

```bash
git checkout master
git pull
git tag v1.0.1
git push origin v1.0.1
```

> Adjust the version as needed (`v1.0.1`, `v1.0.2`, etc.).

### 5. Merge the hotfix back into `development`

You must also merge the fix into `development` to avoid regressions:

```bash
git checkout development
git pull
git merge hotfix/fix-login-crash
git push
```

### 6. Delete the hotfix branch

```bash
git branch -d hotfix/fix-login-crash
git push origin --delete hotfix/fix-login-crash
```

---

## 🧼 Naming Conventions

Use:

```
hotfix/<short-description>
```

Examples:

- `hotfix/fix-payment-validation`
- `hotfix/fix-login-crash`
- `hotfix/missing-texture-loading`

---

## ⚠️ Best Practices

- Keep hotfixes small, isolated, and well-tested.
- Do not introduce new features in a hotfix.
- Always merge back into `development` after fixing `master`.

---

## 🤝 Contributions

This hotfix process helps ensure production stability while maintaining a clean Git history.  
Suggestions for improvements are welcome via pull request.
