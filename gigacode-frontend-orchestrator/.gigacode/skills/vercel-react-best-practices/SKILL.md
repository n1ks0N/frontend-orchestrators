---
name: vercel-react-best-practices
description: Targeted React/Next.js performance and rendering checks for frontend bugfixes. Use only when changed React code can affect waterfalls, bundle size, hydration, rerenders or client/server boundaries.
license: MIT
metadata:
  origin: Vercel-adapted
---

# React Performance Bugfix Checks

Use this skill as a focused checklist, not as a broad optimization mandate.

## Check Only When Relevant

- Async waterfalls introduced or touched by the diff.
- Heavy client components, conditional dynamic imports or bundle-sensitive imports.
- Hydration/client-server boundary changes.
- Re-render risks from unstable props, derived state or effects.
- Long lists, expensive calculations or repeated mapping in render.
- Browser-only APIs, localStorage/sessionStorage or global listeners.

## Rules

- Do not optimize unrelated code.
- Do not introduce new libraries.
- Prefer project-local patterns and existing framework conventions.
- Do not use memoization as a default fix; require evidence of rerender or expensive work.
- Do not suppress hydration warnings to hide real mismatch bugs.
- Record evidence from changed files, nearby patterns and verification output.
