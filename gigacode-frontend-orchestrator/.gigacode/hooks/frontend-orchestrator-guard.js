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

function toolName(payload) {
  return valueAt(payload, ['tool_name', 'toolName', 'name']);
}

function toolCommand(payload) {
  return valueAt(payload, [
    'tool_input.command',
    'toolInput.command',
    'input.command',
    'command'
  ]);
}

function toolPath(payload) {
  return valueAt(payload, [
    'tool_input.file_path',
    'tool_input.path',
    'toolInput.file_path',
    'toolInput.path',
    'input.file_path',
    'input.path',
    'file_path',
    'path'
  ]);
}

function block(message) {
  process.stderr.write(`${message}\n`);
  process.exit(2);
}

const payload = parsePayload(readStdin());
const name = toolName(payload);
const command = toolCommand(payload);
const filePath = toolPath(payload);

if (/^(Bash|Shell|run_shell_command)$/.test(name) && command) {
  const destructive = /\b(rm\s+-[a-zA-Z]*r[a-zA-Z]*f|rm\s+-[a-zA-Z]*f[a-zA-Z]*r|git\s+reset\s+--hard|git\s+clean\s+-[a-zA-Z]*[xdf][a-zA-Z]*|git\s+checkout\s+--|git\s+restore\s+(?:--source\s+\S+\s+)?(?:--staged\s+)?(?:--worktree\s+)?(?:\.|\/|\S+)|sudo\s+|chmod\s+777|mkfs|dd\s+if=)/;
  const secretRead = /\b(cat|less|more|sed|awk|grep|rg)\b.*(\.env(\.|$)|id_rsa|id_ed25519|\.pem\b|\.p12\b|credentials|secret|token)/i;
  const dependencyChange = /\b(npm\s+(install|i|update|add)|pnpm\s+(install|add|update|up)|yarn\s+(install|add|upgrade)|bun\s+(install|add|update))\b/;
  const externalNetwork = /\b(curl|wget|nc|netcat|ssh|scp|rsync|ftp|sftp)\b/;
  const publishOrDeploy = /\b(git\s+push|gh\s+pr\s+merge|npm\s+publish|pnpm\s+publish|yarn\s+publish|vercel\s+deploy|netlify\s+deploy|firebase\s+deploy|kubectl\s+apply|helm\s+(install|upgrade))\b/;

  if (destructive.test(command)) {
    block('Blocked by frontend-orchestrator guard: destructive shell command requires explicit user approval.');
  }
  if (secretRead.test(command)) {
    block('Blocked by frontend-orchestrator guard: direct secret or credential reads are outside the workflow scope.');
  }
  if (dependencyChange.test(command)) {
    block('Blocked by frontend-orchestrator guard: dependency changes require explicit user approval.');
  }
  if (externalNetwork.test(command)) {
    block('Blocked by frontend-orchestrator guard: external network commands require explicit user approval.');
  }
  if (publishOrDeploy.test(command)) {
    block('Blocked by frontend-orchestrator guard: publish, deploy, merge or push commands require explicit user approval.');
  }
}

if (/^(Read|Edit|Write|MultiEdit)$/.test(name) && filePath) {
  const secretPath = /(^|\/)(\.env(\.|$)|id_rsa|id_ed25519|.*\.pem|.*\.p12|credentials|secrets?|tokens?|\.npmrc|\.netrc)(\/|$)/i;
  if (secretPath.test(filePath)) {
    block('Blocked by frontend-orchestrator guard: secret or credential files are outside the workflow scope.');
  }
}

process.stdout.write(JSON.stringify({ continue: true, suppressOutput: true }));
