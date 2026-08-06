#!/usr/bin/env node

const fs = require('fs');

function readStdin() {
  try {
    return fs.readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

function parsePayload(raw) {
  if (!raw.trim()) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function valueAt(payload, keys) {
  for (const key of keys) {
    const value = key.split('.').reduce((current, part) => current && current[part], payload);
    if (typeof value === 'string' && value.trim()) return value;
  }
  return '';
}

function block(message) {
  process.stderr.write(`${message}\n`);
  process.exit(2);
}

const payload = parsePayload(readStdin());
const toolName = valueAt(payload, ['tool_name', 'toolName', 'name']);
const command = valueAt(payload, ['tool_input.command', 'toolInput.command', 'input.command', 'command']);
const filePath = valueAt(payload, [
  'tool_input.file_path',
  'tool_input.path',
  'toolInput.file_path',
  'toolInput.path',
  'input.file_path',
  'input.path',
  'file_path',
  'path'
]);

if (/^(Bash|Shell|run_shell_command)$/.test(toolName) && command) {
  const destructive = /\b(rm\s+-[a-zA-Z]*r[a-zA-Z]*f|git\s+reset\s+--hard|git\s+clean\s+-[a-zA-Z]*[xdf][a-zA-Z]*|git\s+checkout\s+--|git\s+restore\s+.*(?:\.|\/|\S+)|sudo\s+|chmod\s+777|mkfs|dd\s+if=)/;
  const dependencyChange = /\b(npm\s+(install|i|update|add)|pnpm\s+(install|add|update|up)|yarn\s+(install|add|upgrade)|bun\s+(install|add|update))\b/;
  const secretRead = /\b(cat|less|more|sed|awk|grep|rg)\b.*(\.env(\.|$)|id_rsa|id_ed25519|\.pem\b|\.p12\b|credentials|secret|token)/i;
  const publishOrDeploy = /\b(git\s+push|gh\s+pr\s+merge|npm\s+publish|pnpm\s+publish|yarn\s+publish|vercel\s+deploy|netlify\s+deploy|firebase\s+deploy|kubectl\s+apply|helm\s+(install|upgrade))\b/;

  if (destructive.test(command)) block('Blocked by feature orchestrator guard: destructive command requires explicit user approval.');
  if (dependencyChange.test(command)) block('Blocked by feature orchestrator guard: dependency changes require explicit user approval.');
  if (secretRead.test(command)) block('Blocked by feature orchestrator guard: direct secret reads are outside workflow scope.');
  if (publishOrDeploy.test(command)) block('Blocked by feature orchestrator guard: publish, deploy, merge or push requires explicit user approval.');
}

if (/^(Read|Edit|Write|MultiEdit)$/.test(toolName) && filePath) {
  const secretPath = /(^|\/)(\.env(\.|$)|id_rsa|id_ed25519|.*\.pem|.*\.p12|credentials|secrets?|tokens?|\.npmrc|\.netrc)(\/|$)/i;
  if (secretPath.test(filePath)) block('Blocked by feature orchestrator guard: secret or credential files are outside workflow scope.');
  if (/\.agent-run\/.*\.(txt|log|patch|csv)$/i.test(filePath)) block('Blocked by feature orchestrator guard: workflow artifacts must be .md or flow-state.json.');
}

process.stdout.write(JSON.stringify({ continue: true, suppressOutput: true }));
