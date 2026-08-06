# Agent Orchestration

## Available Agents

Located in `.gigacode/agents/`:

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| plan-write-agent | Implementation planning | Every bugfix after research |
| plan-review-agent | Plan validation | Before implementation |
| tdd-guide | Regression test planning | Before writing or updating tests |
| code-review-agent | Code review | After writing code |
| security-reviewer | Security analysis | Before commits |
| build-error-resolver | Fix build errors | When build fails |
| e2e-verification-agent | E2E/browser verification | Bugfix regression flows |
| final-code-review-agent | Final review gate | Before completion |
| task-fulfillment-review-agent | Acceptance check | Before completion |

## Immediate Agent Usage

No user prompt needed:
1. Code just written/modified - Use **code-review-agent** agent
2. Bugfix requires regression evidence - Use **tdd-guide** agent
3. Build fails - Use **build-error-resolver** or **react-build-resolver** agent
4. Completion gate - Use **final-code-review-agent** and **task-fulfillment-review-agent**

## Parallel Task Execution

ALWAYS use parallel Task execution for independent operations:

```markdown
# GOOD: Parallel execution
Launch 3 agents in parallel:
1. Agent 1: Security analysis of auth module
2. Agent 2: Performance review of cache system
3. Agent 3: Type checking of utilities

# BAD: Sequential when unnecessary
First agent 1, then agent 2, then agent 3
```

## Multi-Perspective Analysis

For complex problems, use split role sub-agents:
- Factual reviewer
- Senior engineer
- Security expert
- Consistency reviewer
- Redundancy checker
