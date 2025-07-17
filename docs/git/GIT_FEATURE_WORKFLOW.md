# 🌱 Feature Workflow

This document describes the recommended workflow for developing new features using `feature/*` branches.

---

## 🧩 Branch Overview

- `master`: production-ready code.
- `development`: integration branch for all completed features.
- `feature/*`: branches created from `development` for each new feature.

---

## 🛠️ When to Create a Feature Branch

You should create a `feature/*` branch when:

- Starting a new functionality
- Refactoring a module
- Adding tests, tools, or other improvements

---

## 🚀 Feature Branch Workflow

### 1. Create a feature branch from `development`

```bash
git checkout development
git pull
git checkout -b feature/45-login-ui
```

> Replace `45-login-ui` with a relevant name or issue number.

### 2. Work on the feature

- Make regular commits.
- Keep the scope limited to a single feature.
- Use clear and descriptive commit messages.

Example:

```bash
git add .
git commit -m "Add basic login form with username and password fields"
```

### 3. Push your branch

```bash
git push origin feature/45-login-ui
```

### 4. Open a Pull Request to `development`

> Go to GitHub and open a pull request from `feature/45-login-ui` → `development`.

- Make sure the code builds and passes lint/tests.
- Ask for a code review if needed.

### 5. Merge and delete the branch

Once approved:

- Merge the pull request.
- Delete the feature branch both locally and remotely:

```bash
git branch -d feature/45-login-ui
git push origin --delete feature/45-login-ui
```

---

## 🧼 Naming Conventions

Use the format:

```
feature/<issue-number>-<short-description>
```

Examples:

- `feature/17-user-auth`
- `feature/45-login-ui`
- `feature/102-fix-camera-rotation`

> If not using issue numbers, just use a clear, concise name.

---

## ⚠️ Best Practices

- Keep feature branches small and focused.
- Pull `development` regularly to stay up to date:

```bash
git checkout development
git pull
git checkout feature/45-login-ui
git merge development
```

- Don’t merge directly to `development` — always use PRs.
- Resolve conflicts within your feature branch before opening a PR.

---

## 🤝 Contributions

This workflow ensures clean integration and traceability of new features.  
Feel free to suggest improvements by opening a pull request.
