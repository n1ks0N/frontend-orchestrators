---
name: frontend-analysis-and-plan
description: Превращает research-артефакты frontend-задачи в минимальный implementation plan по файлам, проверкам, рискам и approval-gate.
---

# Frontend Analysis and Plan

Сначала прочитай `.gigacode/skills/gigacode-tool-contract/SKILL.md`.

Используй этот skill только для планирования. Он не пишет код, не запускает проверки и не спрашивает пользователя напрямую.

## Вход

- `.agent-run/general-implementation-outline.md`
- `.agent-run/design-artifact-analysis.md`, если он существует;
- исходное описание задачи, если доступно в контексте;
- ответы пользователя на ранее заданные вопросы, если они есть;
- research-артефакты subagents, если orchestrator приложил их к контексту.

Если нет критичной информации для безопасной реализации, верни только `# Blocking questions` и остановись. Вопросы должны быть конкретными и адресованными основному orchestrator.

## Цель

Собрать такой план, чтобы implementation-agent мог выполнить задачу без догадок:

- какие файлы менять;
- зачем менять каждый файл;
- какие файлы не трогать;
- какие проверки подтвердят результат;
- нужен ли approval пользователя перед реализацией.
- как design artifact должен быть адаптирован в production React, если он найден.

## Алгоритм

1. Отдели факты от гипотез. Факт должен ссылаться на задачу, research или существующий код.
2. Сформулируй одну рабочую гипотезу: почему текущее поведение не совпадает с ожидаемым.
3. Определи минимальный diff. Не добавляй рефакторинг, миграции или переписывание архитектуры без прямой необходимости.
4. Для каждого файла укажи действие: `изменить`, `добавить тест`, `не трогать`, `прочитать при реализации`.
5. Для каждого изменения укажи риск: UI-regression, state-regression, API/cache-regression, type-regression, test-gap или low-risk.
6. Подбери support skills только если они действительно нужны implementation-agent.
7. Определи validation plan: lint/typecheck/unit/e2e/manual сценарий. Не требуй проверки, которая не подтверждает задачу.
8. Реши approval-gate.
9. Если есть design artifact, планируй адаптацию через semantic layout, MUI/project components и React state rules. Не планируй literal HTML-to-JSX copy.

## Когда нужен approval

Approval нужен, если выполняется хотя бы одно условие:

- requirement неоднозначен или конфликтует с другим источником;
- план затрагивает публичный API, shared state, auth, permissions, платежи, данные пользователя или destructive UI-action;
- требуется изменить больше файлов, чем явно следует из задачи;
- есть несколько равнозначных вариантов реализации;
- тесты или проверки не смогут подтвердить результат.

Approval не нужен, если scope понятен, diff локальный, риск низкий и validation plan достаточный.

## Skills для реализации

Указывай paths, а не глобальные skill names:

- `.gigacode/skills/frontend-component-analyzer/SKILL.md` — UI-flow, компонентная цепочка, hooks, local state.
- `.gigacode/skills/vercel-react-best-practices/SKILL.md` — React / Next.js patterns.
- `.gigacode/skills/react-state-management/SKILL.md` — Redux, Zustand, context, shared state.
- `.gigacode/skills/rtk-query-trace/SKILL.md` — RTK Query endpoints, cache, invalidation.
- `.gigacode/skills/mui-v7-patterns/SKILL.md` — Material UI components and styling.
- `.gigacode/skills/typescript-best-practices/SKILL.md` — TypeScript types and API contracts.
- `.gigacode/skills/test-driven-development/SKILL.md` — тесты перед/вместе с изменением, когда поведение можно зафиксировать тестом.
- `.gigacode/skills/design-artifact-to-react-adapter/SKILL.md` — адаптация design artifacts в production React/MUI code.

Не добавляй skill “на всякий случай”.

## Выход

Верни полный Markdown для `.agent-run/implementation-plan.md`:

```md
# Implementation plan

## Facts
- ...

## Working hypothesis
...

## Files to change

### path/to/file
- Action:
- Change:
- Reason:
- Risk:

## Files to read but not change
- ...

## Out of scope
- ...

## Support references for implementation
- ...

## Design artifact adaptation
- Design artifact used: Yes / No
- Source:
- React component boundaries:
- MUI/project component mapping:
- Styling strategy:
- Behavior source:

## Validation plan
- Lint/typecheck:
- Unit tests:
- E2E/browser/manual:
- Why this proves completion:

## Rollback plan
- ...

## Approval
- Required: Yes / No
- Reason:
- Question for user, if required:
```

## Запреты

- Не пиши production-код или тесты.
- Не меняй файлы.
- Не запускай shell/browser/tools для проверки.
- Не расширяй задачу за пределы expected result.
- Не скрывай неопределенность: если уверенность низкая, пиши risk или blocking question.
