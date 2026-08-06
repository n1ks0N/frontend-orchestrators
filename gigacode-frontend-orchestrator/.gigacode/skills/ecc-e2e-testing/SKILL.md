---
name: ecc-e2e-testing
description: E2E/browser regression testing rules for strict frontend bugfix workflow using existing project infrastructure and user-visible evidence.
metadata:
  origin: ECC-adapted
---

# E2E Regression Testing

Use when a bugfix changes user-visible behavior, routing, forms, browser-only behavior, loading/error/empty states or a critical UI path.

## Rules

- Reproduce the bug path first when practical.
- Use existing e2e/browser test infrastructure and commands.
- Prefer role/name/test-id locators already used by the project.
- Keep tests focused on the bug and expected result.
- Do not add global fixtures, auth setup, snapshot baselines or dependencies without approval.
- Do not update visual snapshots unless the visual change is expected and documented.
- Record command, scenario, evidence, not-run items and residual risk.
