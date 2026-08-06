---
name: frontend-feature-orchestrator
description: Minimal GigaCode workflow for frontend feature implementation from master SDD and delta OpenSpec: scope extraction, traceable plan, code, DevTools debug, package checks and final spec review.
---

# Frontend Feature Orchestrator

First read `.gigacode/skills/gigacode-tool-contract/SKILL.md` and `.gigacode/rules/workflow-hardness.md`.

Named agents must be launched only from `.gigacode/agents/*.md`. Do not perform subagent roles manually inside the main orchestrator. If the `agent` tool or a required named agent is unavailable, stop with a blocking issue.

Load support skills only when the current step requires them. Do not bulk-read `.gigacode/skills/`.

## Goal

Implement frontend-only feature changes from a master SDD and delta OpenSpec with traceability, minimal diff, package verification and browser runtime evidence.

## Input

Collect:

- master SDD path;
- delta OpenSpec path;
- target frontend repository path;
- optional generated HTML/design artifact paths;
- optional local app/auth details through `.gigacode/devtools.config.json`.

If master SDD, delta OpenSpec or target repo path is missing, ask one concise question and stop.

## State

After input is available, create `.agent-run/flow-state.json` in the target repo.

Required fields:

```json
{
  "currentStep": "input-collected",
  "masterSpecPath": "",
  "deltaSpecPath": "",
  "targetRepoPath": "",
  "planVersion": 0,
  "approvedPlanVersion": null,
  "artifacts": {
    "specScope": "",
    "traceability": "",
    "codebaseResearch": "",
    "implementationPlan": "",
    "implementationResult": "",
    "changedFiles": "",
    "diff": "",
    "runtimeVerification": "",
    "finalSpecReview": ""
  },
  "canContinue": true,
  "lastFailureReason": ""
}
```

Update state after every artifact.

## Flow

1. **Spec scope**
   - Launch `spec-scope-agent`.
   - Save `.agent-run/spec-scope.md` and `.agent-run/spec-traceability.json`.
   - Stop if frontend scope is empty or ambiguities block code.

2. **Codebase research**
   - Launch `codebase-research-agent`.
   - Save `.agent-run/codebase-research.md`.
   - It must find reuse candidates before planning.

3. **Plan**
   - Launch `implementation-plan-agent`.
   - Save `.agent-run/implementation-plan.md`.
   - Increment `planVersion` and set `approvedPlanVersion` to current version after plan review by the agent.
   - Stop if any planned code change lacks spec evidence.

4. **Implementation**
   - Launch `code-implementation-agent`.
   - Save `.agent-run/implementation-result.md`, `.agent-run/changed-files.md` and `.agent-run/diff.md`.
   - Tests must not be written in this flow.

5. **Runtime verification**
   - Launch `runtime-verification-agent`.
   - Save `.agent-run/runtime-verification.md`.
   - It must run existing package type check, `lint:fix` and `test` scripts when present.
   - It must use DevTools when available and relevant to visible UI behavior.
   - If verification fails due to implementation errors, return to step 4 with the same approved plan unless the plan is invalid.

6. **Final spec review**
   - Launch `final-spec-review-agent`.
   - Save `.agent-run/final-spec-review.md`.
   - Completion requires PASS or an explicit user-approved residual risk.

## Completion

Final response must include:

- implemented frontend scope;
- changed files;
- package checks;
- DevTools result;
- final spec review decision;
- residual risks or blockers.
