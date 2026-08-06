---
name: package-verification
description: Discover and run existing package.json verification scripts for feature work: type checking, lint fixing and test execution without creating new tests.
---

# Package Verification

Read the target project's `package.json`.

Mandatory when scripts exist:

- type check: prefer `typecheck`, `type-check`, `check-types`, then `tsc`;
- lint fix: run `lint:fix`;
- tests: run `test`.

Optional but recommended when present:

- `build`.

Rules:

- Do not add or modify tests in this flow.
- Do not install dependencies.
- Do not invent scripts. If a script is absent, mark it `N/A`.
- Capture command, exit status and key failure lines.
- If `lint:fix` changes files, include them in changed files and diff artifacts.
