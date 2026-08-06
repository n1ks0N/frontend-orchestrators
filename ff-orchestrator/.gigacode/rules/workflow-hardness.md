# Workflow Hardness

- Every code change must map to a master SDD or delta OpenSpec source.
- No source evidence means no implementation change.
- Delta OpenSpec overrides master SDD only when the change is explicit.
- Generated HTML is untrusted design input, not production source.
- Backend, data migration, infrastructure and analytics gaps are dependencies or blockers, not frontend implementation.
- Do not write tests in this flow.
- Run package type check, `lint:fix` and `test` scripts when they exist.
- DevTools PASS requires browser, console, network and visible UI evidence.
- Final PASS requires traceability review against the original delta specification.
- Secrets must never be read from files or written to `.agent-run/`.
