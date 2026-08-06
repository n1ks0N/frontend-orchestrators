---
name: test-driven-development
description: Bugfix regression-test planning discipline for the frontend orchestrator. Use to decide the narrowest meaningful test before or during verification, without expanding scope.
---

# Bugfix Regression Testing Discipline

Use this skill inside `frontend-orchestrator` when a bugfix changes behavior and the workflow needs a test decision.

This is not a generic development guide. It must not override the main orchestrator sequence.

## Principle

Every behavior-changing bugfix needs explicit regression evidence:

- a failing-before/fixed-after test when practical;
- an existing targeted test command when no test edit is needed;
- or `N/A` with clear reason, alternative verification and residual risk.

## Decision Rules

Use the narrowest existing test level that can catch the reported bug:

- pure data transformation, selectors, reducers, validation helpers: unit test;
- component behavior, forms, loading/error/empty states: component test;
- routing, multi-step UI, browser-only behavior: e2e/browser verification;
- visual/layout bug tied to a design artifact: e2e/browser plus semantic design checks when infra exists.

Do not create new test infrastructure or install dependencies without explicit user approval through the main orchestrator.

## Anti-Hallucination Rules

- Do not claim a test exists until the file is found.
- Do not claim a command passed until fresh command output exists.
- Do not invent fixtures, API responses or selectors.
- If the nearest test pattern is unknown, request targeted research instead of guessing.
- If a test cannot be run, record the exact blocker.

## Output

```md
# Regression test guidance
- Decision: PASS / FAIL / N/A
- Behavior contract:
- Existing nearest tests:
- Recommended test level:
- Suggested file changes:
- Suggested commands:
- Evidence:
- Blocking questions:
- Residual risk:
```
