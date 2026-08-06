---
name: ecc-frontend-patterns
description: Frontend bugfix patterns for data flow, UI states, forms, API boundaries, reuse-first changes and silent failure prevention.
metadata:
  origin: ECC-adapted
---

# Frontend Bugfix Patterns

Use for frontend bugfix planning, implementation and review.

## Rules

- Fix the observed defect with the smallest scoped diff.
- Reuse existing components, hooks, services, schemas, utilities, styles and tests.
- Preserve established route, state, data-fetching and error-handling patterns.
- Keep loading/error/empty/success states explicit.
- Validate API, URL, storage and form boundaries before mapping to UI state.
- Do not swallow errors or replace real failures with empty data.
- Do not introduce parallel abstractions when a project-local equivalent exists.
- Every behavior claim must cite file, artifact, command or MCP evidence.
