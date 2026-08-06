---
name: typescript-best-practices
description: Targeted TypeScript safety guide for frontend bugfixes. Use for type narrowing, boundary validation, async correctness and minimal typed changes without creating new architecture.
license: MIT
metadata:
  mode: assistive
  domain: frontend-bugfix
---

# TypeScript Bugfix Practices

Use this skill only when the bugfix touches TypeScript or JavaScript behavior.

## Rules

- Prefer project-local types, schemas, services and utilities.
- Use `unknown` plus narrowing for untrusted API, storage, URL, MCP or generated-artifact data.
- Avoid `any`, broad `Record<string, unknown>`, unsafe `as`, non-null assertions and relaxed config.
- Preserve exported API contracts unless the plan explicitly approves the change.
- Keep changes local to the bug. Do not create modules, generate types from samples or redesign architecture.
- Handle async failures explicitly: no floating promises, swallowed errors or misleading fallbacks.
- Validate DTO/form/URL/storage boundaries before mapping into UI state.

## Evidence

When reviewing or writing TS changes, cite:

- changed file paths;
- existing nearby type patterns;
- project scripts used for typecheck/lint/build;
- unverified gaps and residual risk.
