---
name: enterprise-frontend-standards
description: Compact enterprise frontend standards for feature implementation: minimal diff, TypeScript strictness, React reuse, API evidence, accessibility and security basics.
---

# Enterprise Frontend Standards

Implementation rules:

- Minimal diff.
- Reuse project-local components, hooks, services, schemas, styles and tests helpers.
- Do not create parallel abstractions next to existing ones.
- Do not weaken TypeScript types or use `any` to bypass design issues.
- Keep state and data fetching aligned with neighboring code.
- API endpoints and response shapes require source evidence.
- No new dependencies without explicit user approval.
- Do not store secrets, tokens or credentials.
- User-facing states must cover loading, empty, error and success when required by spec.
- Accessibility minimum: correct labels, focusable controls, keyboard support for interactive elements, visible validation errors.
