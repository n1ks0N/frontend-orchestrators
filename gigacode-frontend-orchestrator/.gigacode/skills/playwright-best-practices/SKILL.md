---
name: playwright-best-practices
description: Focused Playwright guidance for frontend bugfix e2e/browser verification using existing project infrastructure, stable locators and evidence-backed results.
license: MIT
metadata:
  domain: frontend-bugfix-e2e
---

# Playwright Bugfix Verification

Use this skill only inside `e2e-verification-agent` or when the current bugfix needs browser evidence.

## Rules

- Use existing Playwright/Cypress/browser infrastructure. Do not create new infrastructure without approval.
- Prefer role/name/user-visible locators over brittle CSS or DOM-depth selectors.
- Verify the bug reproduction path and the fixed expected behavior.
- Keep new or updated tests narrow to the bug.
- Wait for user-visible readiness, not arbitrary sleeps, unless the project already uses that pattern.
- Capture console/network failures when relevant.
- Do not update snapshots or screenshots unless the expected visual change is documented by the bug/design artifact.
- Record exact commands, result, evidence and residual risk.

## Output

```md
# Browser verification
- Decision: PASS / FAIL / N/A
- Scenario:
- Existing test files:
- Test changes:
- Commands:
- Evidence:
- Not run:
- Residual risk:
- Blocking issues:
```
