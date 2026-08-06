---
name: ecc-accessibility
description: Frontend-only accessibility checks for bugfix work: semantic HTML, keyboard flow, labels, focus, contrast-sensitive states and evidence-backed WCAG 2.2 AA review.
metadata:
  origin: ECC-adapted
---

# Accessibility Bugfix Checks

Use when a bugfix touches user-visible UI, forms, controls, dialogs, tables, navigation, loading/error/empty states or design artifacts.

## Rules

- Prefer native semantic elements before ARIA.
- Every interactive control needs an accessible name and keyboard path.
- Preserve focus behavior in dialogs, popovers, route changes and validation errors.
- Do not hide meaningful error/loading/empty states from assistive technologies.
- Check labels, roles and names against the user-visible behavior, not generated HTML structure.
- Record evidence from changed files, tests or browser inspection. If not checked, record residual risk.
