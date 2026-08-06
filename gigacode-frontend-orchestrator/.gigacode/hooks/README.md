# GigaCode Hooks

This directory contains project-level GigaCode hooks for the frontend workflow runtime.

Hooks are intentionally small and deterministic. They do not call the network, do not modify files and do not replace the orchestrator workflow. Their job is to enforce baseline runtime guardrails before tool execution.

Configured hooks live in `.gigacode/settings.json`.
