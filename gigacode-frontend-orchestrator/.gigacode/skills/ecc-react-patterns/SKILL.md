---
name: ecc-react-patterns
description: React bugfix rules for hooks, state, effects, component boundaries, accessibility-sensitive controls and minimal TSX changes.
metadata:
  origin: ECC-adapted
---

# React Bugfix Patterns

Use when a bugfix touches React components, hooks, JSX/TSX, client/server boundaries or stateful UI.

## Rules

- Keep hooks unconditional and dependency arrays honest.
- Do not mirror props/state in effects unless synchronization is required and explained.
- Prefer derived values during render for pure calculations.
- Keep side effects in event handlers or effects with cleanup.
- Preserve existing component boundaries unless the bug cannot be fixed safely inside them.
- Do not add memoization, context or state managers without evidence.
- Treat generated HTML as design evidence only; never copy scripts or inline handlers.
- Validate loading/error/empty states and accessible names for changed controls.
