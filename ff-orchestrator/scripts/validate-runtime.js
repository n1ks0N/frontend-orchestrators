#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const REQUIRED_SKILLS = [
  'frontend-feature-orchestrator',
  'gigacode-tool-contract',
  'openspec-sdd-analysis',
  'design-html-to-react',
  'devtools-browser-debug',
  'package-verification',
  'enterprise-frontend-standards'
];

const REQUIRED_AGENTS = [
  'spec-scope-agent',
  'codebase-research-agent',
  'implementation-plan-agent',
  'code-implementation-agent',
  'runtime-verification-agent',
  'final-spec-review-agent'
];

const REQUIRED_PATHS = [
  '.gigacode/settings.json',
  '.gigacode/devtools.config.example.json',
  '.gigacode/rules/workflow-hardness.md',
  '.gigacode/hooks/orchestrator-guard.js',
  'GIGACODE.md',
  'package.json'
];

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
      for (const entry of fs.readdirSync(current)) walk(path.join(current, entry));
      return;
    }
    results.push(current);
  }

  walk(root);
  return results;
}

function assertPath(errors, relativePath) {
  if (!exists(relativePath)) errors.push(`Missing required path: ${relativePath}`);
}

function verifySkill(errors, skillName) {
  const relativePath = `.gigacode/skills/${skillName}/SKILL.md`;
  assertPath(errors, relativePath);
  if (!exists(relativePath)) return;
  const content = read(relativePath);
  if (!content.startsWith('---\n')) errors.push(`${relativePath} must start with YAML frontmatter.`);
  if (!new RegExp(`^name:\\s*${skillName}$`, 'm').test(content)) errors.push(`${relativePath} must define name: ${skillName}.`);
  if (!/^description:\s*\S.+$/m.test(content)) errors.push(`${relativePath} must define a non-empty description.`);
}

function verifyAgent(errors, agentName) {
  const relativePath = `.gigacode/agents/${agentName}.md`;
  assertPath(errors, relativePath);
  if (!exists(relativePath)) return;
  const content = read(relativePath);
  if (!content.startsWith('---\n')) errors.push(`${relativePath} must start with YAML frontmatter.`);
  if (!new RegExp(`^name:\\s*${agentName}$`, 'm').test(content)) errors.push(`${relativePath} must define name: ${agentName}.`);
  if (!/^description:\s*\S.+$/m.test(content)) errors.push(`${relativePath} must define a non-empty description.`);
  if (!/^approvalMode:\s*(default|auto-edit)$/m.test(content)) errors.push(`${relativePath} must use approvalMode: default or auto-edit.`);
  if (/^permissions:/m.test(content)) errors.push(`${relativePath} must not use non-GigaCode permissions frontmatter.`);
  if (/^\s*-\s+web_fetch$/m.test(content)) errors.push(`${relativePath} must not use generic web_fetch.`);
}

function verifyReferences(errors) {
  const files = [
    ...walkFiles('.gigacode/skills'),
    ...walkFiles('.gigacode/agents'),
    ...walkFiles('.gigacode/rules')
  ];

  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const content = fs.readFileSync(file, 'utf8');
    for (const match of content.matchAll(/`(\.gigacode\/(?:skills|agents|rules|hooks)\/[^`]+)`/g)) {
      const referencedPath = match[1];
      if (referencedPath.includes('*') || referencedPath.includes('<') || referencedPath.includes(' ')) continue;
      assertPath(errors, referencedPath);
    }
  }
}

function verifyNoLegacyNoise(errors) {
  const forbidden = [
    'frontend-orchestrator',
    'unit-test-coverage-agent',
    'e2e-verification-agent',
    'mcp-atlassian',
    'confluence-research',
    'requirements-repo-research'
  ];

  for (const file of walkFiles('.gigacode')) {
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');
    for (const term of forbidden) {
      if (content.includes(term) && rel !== 'scripts/validate-runtime.js') {
        errors.push(`${rel} contains non-minimal legacy reference: ${term}`);
      }
    }
  }
}

function main() {
  const errors = [];

  for (const relativePath of REQUIRED_PATHS) assertPath(errors, relativePath);
  for (const skill of REQUIRED_SKILLS) verifySkill(errors, skill);
  for (const agent of REQUIRED_AGENTS) verifyAgent(errors, agent);
  verifyReferences(errors);
  verifyNoLegacyNoise(errors);

  if (errors.length) {
    process.stderr.write(`Feature orchestrator validation failed:\n${errors.map((error) => `- ${error}`).join('\n')}\n`);
    process.exit(1);
  }

  const mode = process.argv[2] || 'validate';
  process.stdout.write(`Feature orchestrator ${mode} passed: ${REQUIRED_SKILLS.length} skills, ${REQUIRED_AGENTS.length} agents.\n`);
}

main();
