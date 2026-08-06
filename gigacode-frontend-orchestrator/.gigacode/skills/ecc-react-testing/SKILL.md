---
name: ecc-react-testing
description: React regression testing rules for frontend bugfixes using existing Jest/Vitest/RTL/component-test infrastructure and behavior-focused assertions.
metadata:
  origin: ECC-adapted
---

# React Regression Testing

Use when a bugfix touches React component behavior, hooks, forms, validation, data mapping or UI states.

## Rules

- Test user-visible behavior and state transitions, not implementation details.
- Reuse existing test setup, render helpers, providers, fixtures and MSW/mocks.
- Add the smallest test that would fail for the reported bug.
- Do not mock React internals.
- Do not introduce new testing libraries or global setup without approval.
- Prefer accessible queries (`role`, `name`, visible text) where the project supports them.
- Record exact test files, command output, evidence and residual risk.
