---
name: verification-before-completion
description: Completion gate for frontend bugfix workflow: require fresh verification evidence before claiming fixed, passing or complete.
---

# Verification Before Completion

Use before any agent or orchestrator says the bugfix is complete.

## Rules

- No completion claim without fresh evidence from this workflow run.
- Evidence can be command output, test result, browser/e2e artifact, diff review or explicit `N/A` with residual risk.
- Do not treat a planned command as a completed command.
- Do not hide commands that were not run.
- Do not finish if final review contains `FAIL` or blocking issues.
- If verification is impossible, state the blocker and residual risk plainly.
