#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const REQUIRED_AGENTS = [
  'codebase-research',
  'confluence-research',
  'requirements-repo-research',
  'design-artifact-research',
  'plan-write-agent',
  'plan-review-agent',
  'code-write-agent',
  'code-review-agent',
  'react-build-resolver',
  'build-error-resolver',
  'tdd-guide',
  'unit-test-coverage-agent',
  'e2e-verification-agent',
  'devtools-verification-agent',
  'final-code-review-agent',
  'task-fulfillment-review-agent',
  'react-reviewer',
  'typescript-reviewer',
  'type-design-analyzer',
  'silent-failure-hunter',
  'pr-test-analyzer',
  'security-reviewer'
];

const REQUIRED_SKILLS = [
  'frontend-orchestrator',
  'gigacode-tool-contract',
  'frontend-analysis-and-plan',
  'mcp-atlassian',
  'rtk-query-trace',
  'react-state-management',
  'mui-v7-patterns',
  'typescript-best-practices',
  'test-driven-development',
  'webapp-testing',
  'devtools-browser-verification',
  'playwright-best-practices',
  'verification-before-completion',
  'receiving-code-review',
  'frontend-component-analyzer',
  'design-artifact-to-react-adapter',
  'vercel-react-best-practices',
  'ecc-frontend-patterns',
  'ecc-react-patterns',
  'ecc-react-testing',
  'ecc-e2e-testing',
  'ecc-verification-loop',
  'ecc-accessibility',
  'ecc-security-review'
];

const REQUIRED_RULES = [
  '.gigacode/rules/common/agent-workflow.md',
  '.gigacode/rules/common/security.md',
  '.gigacode/rules/common/testing.md',
  '.gigacode/rules/frontend/frontend-workflow.md',
  '.gigacode/rules/ecc/common/code-review.md',
  '.gigacode/rules/ecc/react/hooks.md',
  '.gigacode/rules/ecc/typescript/patterns.md',
  '.gigacode/rules/ecc/web/testing.md'
];

const REQUIRED_FLOW_FIELDS = [
  'currentStep',
  'taskSummary',
  'planVersion',
  'approvedPlanVersion',
  'approvalStatus',
  'approvalQuestion',
  'planReviewRetries',
  'implementationFixRetries',
  'reactBuildResolverRetries',
  'buildErrorResolverRetries',
  'testFixRetries',
  'finalReviewRetries',
  'userConfirmationMode',
  'selectedResearchAgents',
  'artifacts',
  'designArtifactsFound',
  'activeFailureLane',
  'completedReviewLanes',
  'finalReviewArtifacts',
  'lastFailureReason',
  'canContinue'
];

const REQUIRED_ARTIFACT_FIELDS = [
  'outline',
  'implementationPlan',
  'planReviewResult',
  'designArtifactAnalysis',
  'implementationResult',
  'changedFiles',
  'diff',
  'codeCheckResult',
  'reactBuildResolverResult',
  'buildErrorResolverResult',
  'tddGuidance',
  'unitCoverageResult',
  'e2eVerificationResult',
  'devtoolsVerificationResult',
  'testVerificationResult',
  'finalCodeReviewResult',
  'taskFulfillmentReviewResult',
  'reactReviewResult',
  'typescriptReviewResult',
  'typeDesignReviewResult',
  'silentFailureReviewResult',
  'prTestReviewResult',
  'securityReviewResult',
  'finalReviewResult'
];

const TEXT_EXTENSIONS = new Set([
  '.css',
  '.ini',
  '.js',
  '.json',
  '.md',
  '.mjs',
  '.toml',
  '.ts',
  '.tsx',
  '.txt',
  '.yml'
]);

const FOREIGN_RUNTIME = new RegExp(['Cla' + 'ude', 'Cur' + 'sor', 'Ki' + 'ro', 'Open' + 'Code'].join('|'));

function rel(filePath) {
  return path.relative(ROOT, filePath).replace(/\\/g, '/');
}

function resolve(relativePath) {
  return path.join(ROOT, relativePath);
}

function exists(relativePath) {
  return fs.existsSync(resolve(relativePath));
}

function read(relativePath) {
  return fs.readFileSync(resolve(relativePath), 'utf8');
}

function walkFiles(relativeRoot) {
  const root = resolve(relativeRoot);
  const results = [];
  if (!fs.existsSync(root)) return results;

  function walk(current) {
    const stat = fs.statSync(current);
    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(current)) {
        walk(path.join(current, entry));
      }
      return;
    }
    results.push(current);
  }

  walk(root);
  return results;
}

function walkDirectories(relativeRoot) {
  const root = resolve(relativeRoot);
  const results = [];
  if (!fs.existsSync(root)) return results;

  function walk(current) {
    const stat = fs.statSync(current);
    if (!stat.isDirectory()) return;
    results.push(current);
    for (const entry of fs.readdirSync(current)) {
      walk(path.join(current, entry));
    }
  }

  walk(root);
  return results;
}

function assertPath(errors, relativePath) {
  if (!exists(relativePath)) errors.push(`Missing required runtime path: ${relativePath}`);
}

function verifySkillFrontmatter(errors, relativePath) {
  const content = read(relativePath);
  if (!content.startsWith('---\n')) {
    errors.push(`${relativePath} must start with YAML frontmatter.`);
    return;
  }
  const end = content.indexOf('\n---', 4);
  if (end === -1) {
    errors.push(`${relativePath} must close YAML frontmatter.`);
    return;
  }
  const frontmatter = content.slice(4, end);
  if (!/^name:\s*[A-Za-z0-9_.:-]+$/m.test(frontmatter)) {
    errors.push(`${relativePath} must define a valid skill name.`);
  }
  if (!/^description:\s*(?:\S.+|[>|])$/m.test(frontmatter)) {
    errors.push(`${relativePath} must define a non-empty description.`);
  }
}

function verifyAgentFrontmatter(errors, relativePath) {
  const content = read(relativePath);
  if (!content.startsWith('---\n')) {
    errors.push(`${relativePath} must start with YAML frontmatter.`);
    return;
  }
  if (!/^name:\s*[A-Za-z0-9_.:-]+$/m.test(content)) {
    errors.push(`${relativePath} must define a valid agent name.`);
  }
  if (!/^description:\s*\S.+$/m.test(content)) {
    errors.push(`${relativePath} must define a non-empty description.`);
  }
  const approvalMode = content.match(/^approvalMode: (plan|auto-edit|default|yolo|bubble)$/m)?.[1] || '';
  if (!approvalMode) {
    errors.push(`${relativePath} must use GigaCode approvalMode frontmatter.`);
  }
  if (/^permissions:/m.test(content)) {
    errors.push(`${relativePath} uses non-GigaCode permissions frontmatter.`);
  }
  if (/^\s*-\s+web_fetch$/m.test(content)) {
    errors.push(`${relativePath} must not use generic web_fetch.`);
  }
  if (/^\s*-\s+run_shell_command$/m.test(content) && approvalMode !== 'default') {
    errors.push(`${relativePath} uses run_shell_command and must use approvalMode: default.`);
  }
}

function verifyReferences(errors) {
  for (const filePath of [...walkFiles('.gigacode/agents'), ...walkFiles('.gigacode/rules'), ...walkFiles('.gigacode/skills')]) {
    if (!filePath.endsWith('.md')) continue;
    const content = fs.readFileSync(filePath, 'utf8');
    for (const match of content.matchAll(/`(\.gigacode\/(?:skills|rules)\/[^`]+)`/g)) {
      const referencedPath = match[1];
      if (referencedPath.includes('*') || referencedPath.includes(' ') || referencedPath.includes('<')) continue;
      assertPath(errors, referencedPath);
    }
  }

  const content = read('.gigacode/skills/frontend-orchestrator/SKILL.md');
  for (const match of content.matchAll(/`(\.gigacode\/(?:skills|agents|hooks|rules)\/[^`]+)`/g)) {
    const referencedPath = match[1];
    if (referencedPath.includes('*') || referencedPath.includes(' ') || referencedPath.includes('<')) continue;
    assertPath(errors, referencedPath);
  }
}

function verifyOrchestratorContract(errors) {
  const content = read('.gigacode/skills/frontend-orchestrator/SKILL.md');
  const forbiddenPatterns = [
    /references\/agents/,
    /frontend-orchestrator\/references/,
    /named subagent недоступен/,
    /выполни его роль/,
    /Профиль:/,
    /ecc-e2e-runner/,
    /doc-review/
  ];

  for (const pattern of forbiddenPatterns) {
    if (pattern.test(content)) {
      errors.push(`Primary SKILL.md contains obsolete workflow pattern: ${pattern.source}`);
    }
  }

  const requiredPhrases = [
    'Subagents запускаются только как GigaCode-discoverable named agents',
    'Если `agent` tool или нужный named agent недоступен, остановись',
    'Не продолжай шаг, если state не отражает результат предыдущего шага',
    'Не запускай реализацию, если `approvalStatus: "required"`',
    'Всегда создай или обнови `.agent-run/test-verification-result.md`',
    'Decision: PASS / FAIL / N/A',
    'любой `FAIL` в финальных review artifacts -> не завершай задачу',
    'Hardness mode',
    'evidence-first',
    'Source ledger',
    'Evidence confidence',
    'Reuse map',
    'reuse-first'
  ];

  for (const phrase of requiredPhrases) {
    if (!content.includes(phrase)) {
      errors.push(`Primary SKILL.md is missing required contract phrase: ${phrase}`);
    }
  }

  for (const agentName of REQUIRED_AGENTS) {
    if (!content.includes(`\`${agentName}\``)) {
      errors.push(`Primary SKILL.md does not invoke required named agent: ${agentName}`);
    }
  }
  for (const field of REQUIRED_FLOW_FIELDS) {
    if (!new RegExp(`"${field}"`).test(content)) {
      errors.push(`Primary SKILL.md flow-state schema is missing field: ${field}`);
    }
  }
  for (const field of REQUIRED_ARTIFACT_FIELDS) {
    if (!new RegExp(`"${field}"`).test(content)) {
      errors.push(`Primary SKILL.md artifact schema is missing field: ${field}`);
    }
  }
}

function verifyRuntime() {
  const errors = [];

  assertPath(errors, 'GIGACODE.md');
  assertPath(errors, '.gigacode/settings.json');
  assertPath(errors, '.gigacode/hooks/frontend-orchestrator-guard.js');
  assertPath(errors, '.gigacode/mcp-configs/settings.example.json');
  assertPath(errors, '.gigacode/devtools.config.example.json');
  assertPath(errors, '.gigacode/skills/frontend-orchestrator/SKILL.md');

  if (exists('.gigacode/GIGACODE.md')) {
    errors.push('.gigacode/GIGACODE.md is not a project context location; use root GIGACODE.md.');
  }
  if (exists('.gigacode/skills/frontend-orchestrator/references')) {
    errors.push('frontend-orchestrator/references must not exist; support skills must be top-level .gigacode/skills entries.');
  }
  if (exists('.gigacode/commands/frontend-orchestrator.md')) {
    errors.push('Do not keep a frontend-orchestrator command shim; invoke the skill through the GigaCode skill runner: /skills frontend-orchestrator.');
  }
  if (exists('ecc')) {
    errors.push('Root ecc/ packaging directory must not exist; ECC runtime material belongs under .gigacode/skills/ecc-* and .gigacode/rules/ecc/.');
  }

  for (const skillName of REQUIRED_SKILLS) {
    const relativePath = `.gigacode/skills/${skillName}/SKILL.md`;
    assertPath(errors, relativePath);
    if (exists(relativePath)) verifySkillFrontmatter(errors, relativePath);
  }
  for (const agentName of REQUIRED_AGENTS) {
    const relativePath = `.gigacode/agents/${agentName}.md`;
    assertPath(errors, relativePath);
    if (exists(relativePath)) verifyAgentFrontmatter(errors, relativePath);
  }
  for (const rulePath of REQUIRED_RULES) {
    assertPath(errors, rulePath);
  }

  if (exists('.gigacode/skills/MARKETPLACE_SKILLS_MANIFEST.json')) {
    errors.push('Marketplace vendoring manifest is not runtime material.');
  }
  if (exists('.gigacode/skills/frontend-orchestrator/config.json')) {
    errors.push('frontend-orchestrator/config.json is legacy runtime config; keep behavior in SKILL.md and settings.json.');
  }

  verifyOrchestratorContract(errors);
  verifyReferences(errors);

  const toolContract = read('.gigacode/skills/gigacode-tool-contract/SKILL.md');
  for (const phrase of [
    'Evidence and hallucination control',
    'Do not invent requirements',
    'A `PASS` decision requires evidence',
    'git push, deployment, release, publish or merge commands'
  ]) {
    if (!toolContract.includes(phrase)) {
      errors.push(`Tool contract is missing hardness phrase: ${phrase}`);
    }
  }

  for (const agentPath of walkFiles('.gigacode/agents')) {
    if (!agentPath.endsWith('.md')) continue;
    const relativePath = rel(agentPath);
    const content = fs.readFileSync(agentPath, 'utf8');
    if (!/(# Evidence|Evidence:|# Source status|Source status:|# Commands|Commands:|Команды:)/.test(content)) {
      errors.push(`${relativePath} output contract must require evidence, source status or command evidence.`);
    }
  }

  for (const directoryPath of walkDirectories('.')) {
    const relativePath = rel(directoryPath);
    if (relativePath === '') continue;
    if (fs.readdirSync(directoryPath).length === 0) {
      errors.push(`Empty directory must not be kept: ${relativePath}`);
    }
  }

  for (const filePath of walkFiles('.')) {
    const relativePath = rel(filePath);
    const basename = path.basename(filePath);
    if (basename === '.DS_Store') {
      errors.push(`macOS metadata file must not be kept: ${relativePath}`);
      continue;
    }
    if (!TEXT_EXTENSIONS.has(path.extname(filePath))) continue;

    const content = fs.readFileSync(filePath, 'utf8');
    if (
      (relativePath.startsWith('.gigacode/agents/') ||
        relativePath.startsWith('.gigacode/rules/ecc/')) &&
      FOREIGN_RUNTIME.test(content)
    ) {
      errors.push(`${relativePath} contains foreign runtime assumptions: ${FOREIGN_RUNTIME.source}`);
    }
    if (relativePath.startsWith('.gigacode/agents/') && /`references\//.test(content)) {
      errors.push(`${relativePath} contains skill-relative references path.`);
    }
  }

  return errors;
}

function main() {
  const command = process.argv[2] || 'validate';
  if (!['validate', 'doctor'].includes(command)) {
    console.error(`Unknown command: ${command}`);
    console.error('Usage: node scripts/validate-runtime.js [validate|doctor]');
    process.exitCode = 2;
    return;
  }

  const errors = verifyRuntime();
  for (const error of errors) console.error(`ERROR: ${error}`);
  if (errors.length > 0) {
    process.exitCode = 1;
    return;
  }

  if (command === 'doctor') {
    console.log('Doctor checks passed.');
    console.log('- GigaCode runtime surface is present.');
    console.log('- Skills, agents, rules and hooks follow the expected GigaCode layout.');
    console.log('- ECC material is vendored only as runtime skills/rules.');
    return;
  }

  console.log(`Validated ${REQUIRED_SKILLS.length} skills, ${REQUIRED_AGENTS.length} agents and ${REQUIRED_RULES.length} required rule files.`);
}

main();
