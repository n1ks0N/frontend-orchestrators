---
name: ecc-verification-loop
description: Evidence-first verification loop for strict frontend bugfix workflow: build/typecheck/lint/test/e2e decisions with explicit command evidence and residual risk.
metadata:
  origin: ECC-adapted
---

# ECC Verification Loop

Use this skill when an agent must decide whether a bugfix can move to the next gate.

## Contract

- Prefer existing project scripts from `package.json`.
- Run only commands relevant to the changed files and bug behavior.
- Do not install dependencies, change config, deploy, push, publish or call external network tools.
- Do not claim a command passed unless it was run in the current workflow and the result is recorded.
- If a command cannot be run, record the exact blocker and residual risk.
- `PASS` requires evidence; `FAIL` requires a concrete blocker; `N/A` requires a reason and alternative verification.

## Verification Order

1. Build/typecheck/lint if the project has relevant scripts.
2. Targeted unit/component tests for changed logic.
3. E2E/browser verification for user-visible behavior.
4. Diff review against `.agent-run/implementation-plan.md`.
5. Final review artifacts before completion.

## Output Fields

Every verification artifact should include:

```md
# Verification
- Decision: PASS / FAIL / N/A
- Commands:
- Evidence:
- Not run:
- Residual risk:
- Blocking issues:
```
