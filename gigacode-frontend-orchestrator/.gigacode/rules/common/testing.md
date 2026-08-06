# Testing Rules

- Every implementation needs an explicit verification decision: `PASS`, `FAIL`, or `N/A`.
- Use `N/A` only when a test is genuinely not relevant or no existing infrastructure can verify the change.
- Prefer existing project scripts and nearby tests.
- Add or update targeted tests when behavior changes and test infrastructure already exists.
- Do not create a new test framework, large fixture or dependency without approval.
- Final review must not complete if diff or verification evidence is unavailable.

