# Frontend Bugfix Code Review Standards

Use these rules for `code-review-agent`, `final-code-review-agent` and focused review lanes.

## Mandatory Checks

- Diff matches `.agent-run/implementation-plan.md`.
- The observed bug is addressed without unrelated changes.
- New components, hooks, utilities, services, types or test helpers are justified by reuse evidence.
- Error/loading/empty states remain explicit where behavior depends on them.
- Types, validation and API boundaries are not weakened.
- No debug output, hardcoded secrets, test-only code in production or dead branches.
- Verification evidence exists or residual risk is explicit.

## Severity

| Level | Blocking | Meaning |
| --- | --- | --- |
| CRITICAL | Yes | Security issue, data loss, broken user path or destructive side effect |
| SERIOUS | Yes | Likely runtime bug, broken requirement, invalid test evidence or unsafe type/data boundary |
| MEDIUM | No | Maintainability or coverage concern that does not block the bugfix |
| LOW | No | Style or polish note |

## Evidence Rules

- Blocking findings require file/diff/test/command evidence.
- If evidence is incomplete, mark it as residual risk or `Unknown`.
- Do not block on generic preferences.
- Do not ask for broad rewrites, unrelated cleanup or new architecture.

## Review Lanes

- Use `security-reviewer` for user input, validation, auth/session/storage, external URLs, generated HTML, API boundaries or dependency/config changes.
- Use `react-reviewer` for React/TSX/hook/component behavior.
- Use `typescript-reviewer` for TS/JS safety and async/data-boundary correctness.
- Use `pr-test-analyzer` for regression evidence quality.
