# FF Orchestrator

Use this runtime through:

```text
/skills frontend-feature-orchestrator
```

This package is a minimal enterprise frontend feature workflow for SDD/OpenSpec work.

Input:

- master SDD specification path;
- delta OpenSpec change path;
- target frontend repository path;
- optional generated HTML or design artifact paths;
- optional `.gigacode/devtools.config.json` for local browser debugging.

Core rule: every implementation change must trace back to the SDD/OpenSpec source.
