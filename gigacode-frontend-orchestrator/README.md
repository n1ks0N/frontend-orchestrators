# GigaCode Frontend Orchestrator

This repository contains a self-contained strict GigaCode frontend bugfix/e2e workflow built around the `frontend-orchestrator` skill.

Runtime files live in `.gigacode/`:

```text
GIGACODE.md
.gigacode/
├── agents/
├── hooks/
├── mcp-configs/
├── rules/
├── devtools.config.example.json
├── settings.json
└── skills/
scripts/
```

## Runtime Surface

- `.gigacode/skills/frontend-orchestrator/` — the main frontend workflow skill.
- `.gigacode/skills/*/SKILL.md` — standalone support skills discovered by the GigaCode runtime and loaded only when selected.
- `GIGACODE.md` — project context file loaded by GigaCode Code from the repository root.
- `.gigacode/agents/*.md` — named subagent profiles extracted from the skill plus selected ECC-adapted frontend quality agents for GigaCode-style agent discovery.
- `.gigacode/rules/common/` — lightweight always-on workflow rules.
- `.gigacode/rules/frontend/` — frontend-specific rules for React/TypeScript/MUI/RTK Query work.
- `.gigacode/rules/ecc/` — selected ECC common, React, TypeScript and Web quality rules.
- `.gigacode/settings.json` and `.gigacode/hooks/` — project-level hook configuration and guard scripts.
- `.gigacode/mcp-configs/settings.example.json` — non-secret MCP reference for `atlassian` and `code-index`.
- `.gigacode/devtools.config.example.json` — non-secret template for local browser/devtools verification and login flow.
- `scripts/validate-runtime.js` — package integrity check for the runtime layout.

## ECC Frontend Quality Layer

The runtime adapts selected upstream ECC frontend capabilities:

- agents: `react-reviewer`, `typescript-reviewer`, `react-build-resolver`, `build-error-resolver`, `security-reviewer`, `tdd-guide`, `pr-test-analyzer`, `silent-failure-hunter`, `type-design-analyzer`;
- skills: ECC `ecc-frontend-patterns`, `ecc-react-patterns`, `ecc-react-testing`, `ecc-e2e-testing`, `ecc-verification-loop`, `ecc-accessibility`, `ecc-security-review`;
- rules: selected ECC common, React, TypeScript and Web quality rules.

The orchestrator invokes these lanes as build repair, targeted test planning, e2e regression verification and final review gates when the diff makes them relevant. E2E test ownership stays with `e2e-verification-agent`; browser runtime, console and network evidence belongs to `devtools-verification-agent` when the `devtools` extension is available.

## Validation

Run from this folder:

```bash
npm run validate
npm run doctor
npm test
```

These checks assert that the current `.gigacode` runtime is coherent: required skills, agents, rules and hooks exist, legacy runtime terms are absent, risky document-review material is not bundled, and the orchestrator contract keeps state/test/review gates explicit.

## Usage

```text
/skills frontend-orchestrator
```

The durable workflow logic lives in `.gigacode/skills/frontend-orchestrator/SKILL.md`.

## Required MCP

For the intended workflow, configure:

- `code-index` for repository navigation and code search.
- `atlassian` for Jira, Confluence and Bitbucket/Stash research.
- `devtools` extension for local browser runtime verification, console/network inspection and auth-backed reproduction steps.

Use `.gigacode/mcp-configs/settings.example.json` only as a non-secret reference for the expected MCP names.
Use `.gigacode/devtools.config.example.json` as the template for `.gigacode/devtools.config.json`; do not store passwords, tokens or OTP values in the file.
