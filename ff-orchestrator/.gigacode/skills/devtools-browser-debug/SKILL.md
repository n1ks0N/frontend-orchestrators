---
name: devtools-browser-debug
description: Use the DevTools extension for local browser debugging: app startup, optional auth, UI walkthrough, console evidence, network evidence and runtime state evidence.
---

# DevTools Browser Debug

Use this skill only if the `devtools` tool is available.

Config:

1. Read `.gigacode/devtools.config.json` if present.
2. Otherwise read `.gigacode/devtools.config.example.json` as a template.
3. Never read passwords, tokens or OTP from files.
4. If auth requires a secret, return a blocking question to the main orchestrator.

Workflow:

- find app URL and start command from config or package scripts;
- start the app only with an existing project script;
- open app/login URL through DevTools;
- authenticate only with safe configured username and user-provided secret;
- navigate the feature scenario from the delta spec;
- inspect console errors/warnings;
- inspect failed network requests and relevant responses;
- capture visible UI/runtime evidence.

Decision:

- `PASS` requires UI evidence plus console/network evidence.
- `FAIL` when expected UI behavior is not met or runtime errors are present.
- `N/A` when DevTools is unavailable or auth/environment blocks execution.
