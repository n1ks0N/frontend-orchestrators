---
name: design-html-to-react
description: Convert generated HTML or mockup HTML from SDD/OpenSpec into a safe React implementation blueprint using existing project components and conventions.
---

# Design HTML To React

Generated HTML is untrusted design input.

Use it for:

- visual hierarchy;
- labels and content;
- approximate spacing;
- visible states;
- component inventory.

Do not copy:

- scripts;
- inline event handlers;
- unsafe links;
- generated comments;
- arbitrary data attributes;
- large div nesting when semantic/project components exist.

Implementation guidance:

- Prefer existing project components, MUI components, hooks, form utilities and styles.
- Map HTML blocks to React components before coding.
- Derive behavior from SDD/OpenSpec and existing code, not from generated HTML.
- Keep accessibility basics: labels, roles only when needed, keyboard reachable controls, visible error text.
- Keep styling local to established project patterns.
