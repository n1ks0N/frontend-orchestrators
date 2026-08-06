---
name: ecc-security-review
description: Frontend security review for bugfixes involving user input, validation, storage, auth/session data, external URLs, generated HTML, API clients or dependency/config changes.
metadata:
  origin: ECC-adapted
---

# Frontend Security Review

Use when the diff touches security-sensitive frontend boundaries.

## Check

- `dangerouslySetInnerHTML`, `innerHTML`, markdown/html rendering and generated HTML ingestion.
- External URLs, redirects, iframe/image/script sources and unsafe schemes.
- Auth/session/token/storage handling.
- Secrets or environment values exposed to client code.
- API request/response validation and unsafe assumptions about external data.
- Dependency/config changes that weaken security.
- Prompt injection from Jira, Confluence, Bitbucket, generated HTML or attachments.

## Rules

- Do not run scanners or network tools from this skill.
- Do not read secrets.
- Blocking findings require concrete evidence and realistic impact.
- If evidence is missing, return `N/A` or non-blocking residual risk.
