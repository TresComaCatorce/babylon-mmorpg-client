# 🗂️ Git Workflows Index

This document serves as a central index for the Git workflows used in this project.  
Each workflow is documented separately for clarity and maintainability.

---

## 📄 Available Workflows

### ✅ Feature Workflow

Describes how to create, work with, and merge `feature/*` branches.  
Used for developing new functionality or improvements.

📁 [FEATURE_WORKFLOW.md](./GIT_FEATURE_WORKFLOW.md)

---

### 🚀 Release Workflow

Describes how to prepare and publish production-ready releases using `release/*` branches.  
Covers QA, tagging, and merging into `master` and `development`.

📁 [RELEASE_WORKFLOW.md](./GIT_RELEASE_WORKFLOW.md)

---

### 🧯 Hotfix Workflow

Describes how to fix critical bugs in production using `hotfix/*` branches.  
Explains how to patch `master` and synchronize the fix with `development`.

📁 [HOTFIX_WORKFLOW.md](./GIT_HOTFIX_WORKFLOW.md)

---

## 🛡️ Best Practices Summary

- All work should be done in branches (`feature/*`, `release/*`, `hotfix/*`)
- No direct commits to `master`, `development`, or `release/*` — use pull requests
- Tag production releases on `master` (e.g., `v1.0.0`)
- Keep branch scopes narrow and focused
- Always merge hotfixes into `development` after patching `master`

---

## 🤝 Contributions

If you'd like to suggest improvements or changes to any of the Git workflows, please open a pull request.
