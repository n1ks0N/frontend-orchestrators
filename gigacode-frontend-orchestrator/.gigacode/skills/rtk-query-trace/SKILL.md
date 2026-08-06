---
name: rtk-query-trace
description: Анализирует RTK Query data-flow: endpoint, args, cache key, tags, invalidation, consumers и UI states, чтобы избежать stale data и случайного refetch-driven fix.
---

# RTK Query Trace

Используй этот skill только если задача реально затрагивает RTK Query, API cache, stale data, loading/error states или UI, который зависит от RTK Query hook.

Сначала прочитай `.gigacode/skills/gigacode-tool-contract/SKILL.md`.

## Цель

Построить trace от пользовательского сценария до endpoint и обратно в UI:

```text
user action / route
-> component / hook
-> query or mutation args
-> endpoint definition
-> transform / select / mapping
-> cache key and tags
-> invalidation or refetch behavior
-> rendered UI state
```

## Что найти

- Где объявлен `createApi` slice и нужный endpoint.
- Какой hook используется: query, lazy query, mutation.
- Какие args формируют cache key.
- Есть ли `skip`, `skipToken`, polling, lazy trigger, manual `refetch`.
- Как устроены `providesTags` и `invalidatesTags`.
- Есть ли `transformResponse`, `serializeQueryArgs`, `merge`, `forceRefetch`, optimistic update.
- Какие components/selectors читают результат endpoint.
- Как UI обрабатывает `isLoading`, `isFetching`, `isError`, empty state и stale data.
- Какие tests уже покрывают endpoint, hook или affected UI.

## Правила анализа

- Не предлагай `refetch` как default fix. Сначала проверь, почему cache не обновляется.
- Не меняй invalidation, пока не понятны все consumers endpoint.
- Не лечи race condition таймаутом.
- Не добавляй broad tags, если можно invalidation сделать точнее.
- Не меняй query args shape без оценки downstream usage.
- Если endpoint shared, явно пометь regression risk.

## Типовые выводы

Используй эти категории, чтобы план был точным:

- `wrong-args` — component передает неполные или нестабильные args.
- `missing-invalidation` — mutation не инвалидирует нужные tags.
- `over-invalidation` — invalidation слишком широкая и вызывает лишние запросы.
- `stale-selector` — component использует старые derived данные.
- `loading-state-gap` — UI не различает initial loading и background refetch.
- `mapping-gap` — `transformResponse` или adapter теряет нужные поля.
- `skip-condition-gap` — query не запускается из-за неверного `skip`.
- `test-gap` — поведение не покрыто тестами.

## Выход

Верни Markdown для plan/research artifact:

```md
# RTK Query trace

## Scenario
- User action / route:
- Expected data behavior:
- Actual data behavior:

## Endpoint facts
- API slice:
- Endpoint:
- Hook:
- Args:
- Cache key behavior:
- Tags:

## Consumers
- Components/selectors:
- UI states:

## Risk assessment
- Cache risk:
- Consumer regression risk:
- Test gap:

## Recommended change
- Minimal fix:
- Files:
- Why not refetch-only:

## Required tests
- Unit/component:
- E2E/manual:
```

## Stop conditions

Верни `# Blocking questions`, если:

- endpoint невозможно определить;
- есть несколько endpoints с похожим назначением;
- source of truth между UI и API requirements конфликтует;
- изменение cache behavior может затронуть чужой сценарий, но usage не найден.
