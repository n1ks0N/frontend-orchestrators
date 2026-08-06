---
name: openspec-sdd-analysis
description: Analyze master SDD plus delta OpenSpec changes, extract frontend-only requirements, acceptance criteria, API dependencies, UI states and traceability IDs for feature implementation.
---

# OpenSpec SDD Analysis

Read only the provided master SDD and delta OpenSpec paths. If paths are missing or unreadable, return blocking questions.

Extract:

- master project context: terminology, domain rules, global UI/API constraints;
- delta changes: added/modified/removed requirements, scenarios and acceptance criteria;
- frontend-only scope: screens, routes, components, forms, validation, state, client API usage, loading/error/empty states;
- non-frontend scope: backend endpoints, migrations, auth policy, infrastructure, analytics, permissions, data model ownership;
- API contracts visible to frontend: endpoints, methods, request/response shapes, status/error semantics;
- generated HTML/design fragments and their source locations.

Traceability:

- Assign each frontend work item a stable source id from OpenSpec or the nearest file/heading path.
- If no explicit id exists, use `path#heading` and mark `Source id synthesized`.
- Preserve conflicts between master and delta specs instead of resolving them silently.

Output must separate facts from hypotheses and list blocking ambiguities that affect code.
