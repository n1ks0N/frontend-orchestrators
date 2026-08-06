---
name: mui-v7-patterns
description: Targeted MUI v7 guidance for frontend bugfixes involving existing Material UI components, sx styling, theme tokens, responsive layout or accessibility-sensitive controls.
---

# MUI v7 Bugfix Patterns

Use only when changed files already use MUI or the approved plan explicitly maps a design artifact to existing MUI/project components.

## Rules

- Prefer existing project wrappers and themed components before raw MUI primitives.
- Use `sx` and theme tokens consistently with nearby files.
- Preserve responsive behavior across declared breakpoints.
- Do not add a new theme, provider or design abstraction for a narrow bugfix.
- Prefer semantic controls and accessible labels.
- Do not copy inline styles from generated HTML without an explicit reason in the plan.
- Record evidence from nearby components and changed files.
