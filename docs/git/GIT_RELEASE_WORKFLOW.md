# 🛠️ Release Workflow

This document describes the Git workflow used to manage version releases via `release/*` branches.

---

## 🧩 Main Branches

- `master`: contains production-ready code.
- `development`: integration branch for new features.
- `feature/*`: temporary branches for individual features.
- `release/*`: branches used to stabilize and finalize a new version.
- `hotfix/*`: branches for urgent fixes in production.

---

## 🚀 Full Release Workflow

### 1. Create a new feature

```bash
git checkout development
git checkout -b feature/3-login-ui
```

> Develop the feature normally and commit your work.  
> When finished, push the branch and open a pull request to `development`.

```bash
git push origin feature/3-login-ui
```

### 2. Create a release branch

Once `development` includes all the features for the next version:

```bash
git checkout development
git pull
git checkout -b release/v1.0.0
git push origin release/v1.0.0
```

> In this branch:
>
> - Perform final adjustments
> - Run QA/testing
> - Update version numbers, changelogs, etc.

### 3. Stabilize the release

Fix any bugs or issues found during testing **in the `release/*` branch directly**.

> If working in a team, use pull requests into the `release/*` branch for visibility.

### 4. Publish the release

When the release is ready:

- 🔀 Open a pull request: `release/v1.0.0` → `master`
    - This deploys the release to production
    - Optionally, tag the version:

```bash
git tag v1.0.0
git push origin v1.0.0
```

- 🔁 Then open a pull request: `release/v1.0.0` → `development`
    - This ensures bugfixes made during release are not lost

### 5. Delete the release branch

```bash
git branch -d release/v1.0.0
git push origin --delete release/v1.0.0
```

---

## ✅ General Rules

- Never push or merge directly to `master`. Always use pull requests.
- Protect `master`, `development`, and `release/*` branches in GitHub.
- Always tag releases (`v1.0.0`, `v1.1.0`, etc.) after merging to `master`.
- Use descriptive feature branch names:
    - `feature/12-login-ui`
    - `feature/45-new-inventory-system`

---

## 📌 Flow Diagram

```text
development
  ↑
  │      ← PR
feature/3-login-ui
          ↓
     [Merge PR]
          ↓
   release/v1.0.0
        ↓      ↓
     master  development
```

---

## 🧪 Emergency Fixes (Hotfixes)

In case of a critical bug in production:

```bash
git checkout master
git pull
git checkout -b hotfix/login-bug
# Fix, commit, push
git push origin hotfix/login-bug
```

Then:

- Open a pull request to `master`
- Tag the release (e.g., `v1.0.1`)
- Merge the same fix into `development`

---

## 🤝 Contributions

This workflow is based on Git Flow and adapted to the needs of this project.  
Suggestions and improvements are welcome via pull request.
