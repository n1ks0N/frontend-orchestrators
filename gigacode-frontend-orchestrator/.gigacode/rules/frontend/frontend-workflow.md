# Frontend Workflow Rules

- Use `frontend-orchestrator` as the main workflow skill for frontend tasks.
- Prefer React/TypeScript/MUI/RTK Query conventions already present in the target project.
- Reuse existing project components, hooks, utilities, services, types, schemas, fixtures and test helpers before creating new ones.
- Do not invent new abstractions, file layouts, state patterns, API clients or styling systems when the project already has an equivalent pattern.
- Any new component/hook/utility/type/service/test helper must have an explicit justification in the implementation plan.
- Keep diffs minimal and avoid unrelated rewrites.
- For design artifacts or generated HTML, create a semantic blueprint before implementation.
- Map UI to existing project components first, MUI second, and custom code only when needed.
- Behavior comes from requirements and existing code, not from static generated HTML.
- Cover user-facing behavior with unit/component/e2e checks where the project already supports them.
