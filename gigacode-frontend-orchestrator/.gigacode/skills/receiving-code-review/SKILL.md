---
name: receiving-code-review
description: Review-response discipline for frontend bugfix workflow: verify findings against code evidence, implement only valid blocking fixes, and avoid blind agreement.
---

# Receiving Code Review

Use when an agent consumes review output from `code-review-agent` or final review lanes.

## Rules

- Treat review comments as claims to verify, not commands to obey blindly.
- Implement only findings backed by file/diff/test evidence.
- If a finding is unclear, return a blocking question to the main orchestrator.
- Do not add unrelated improvements while addressing review feedback.
- Preserve the approved/current plan unless review evidence proves the plan is wrong.
- After a fix, rerun the relevant gate that produced the finding.
