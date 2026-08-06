---
name: react-state-management
description: Targeted React state/data-flow guidance for bugfixes involving local state, Redux/RTK Query, React Query, cache invalidation, selectors or loading/error/empty states.
---

# React State Management Bugfix Guide

Use when the bug involves stale data, wrong derived state, cache invalidation, selectors, reducers, query args, form state or UI status flags.

## Rules

- Trace user action -> component/hook -> state/query/mutation -> rendered UI.
- Reuse the project's existing state library and patterns.
- Do not introduce a new state manager.
- Do not fix stale data with blind refetching; identify cache key, tags, invalidation and consumers.
- Keep status modeling explicit: loading, success, empty, error.
- Validate API data before storing or rendering it.
- Record evidence from files, existing tests and command output.
