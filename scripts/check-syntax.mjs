#!/usr/bin/env node
/**
 * Parse-checks JS/JSX/TS files so a truncated or malformed write can never be
 * committed. Added after a half-written StoreClient.jsx (cut off mid-attribute
 * at line 1259) failed three production builds in a row.
 *
 * Usage: node scripts/check-syntax.mjs <file...>
 * Exits non-zero and prints the offending file:line on the first failure.
 */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const EXTENSIONS = /\.(jsx?|mjs|cjs|tsx?)$/;

function loadParser() {
  try {
    const { parse } = require('@babel/parser');
    return (code, file) =>
      parse(code, {
        sourceType: 'module',
        errorRecovery: false,
        plugins: ['jsx', 'typescript', 'decorators-legacy', 'classProperties'],
        sourceFilename: file,
      });
  } catch {
    return null;
  }
}

/**
 * Zero-dependency fallback. It cannot validate grammar, but it reliably catches
 * the truncation case: a file that stops mid-expression leaves brackets open.
 */
function structuralCheck(code, file) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  let line = 1;
  let mode = null; // 'line' | 'block' | quote char

  for (let i = 0; i < code.length; i++) {
    const c = code[i];
    const next = code[i + 1];
    if (c === '\n') line++;

    if (mode === 'line') {
      if (c === '\n') mode = null;
      continue;
    }
    if (mode === 'block') {
      if (c === '*' && next === '/') { mode = null; i++; }
      continue;
    }
    if (mode) {
      if (c === '\\') { i++; continue; }
      if (c === mode) mode = null;
      continue;
    }

    if (c === '/' && next === '/') { mode = 'line'; i++; continue; }
    if (c === '/' && next === '*') { mode = 'block'; i++; continue; }
    if (c === '"' || c === "'" || c === '`') { mode = c; continue; }

    if (c === '(' || c === '[' || c === '{') stack.push({ c, line });
    else if (pairs[c]) {
      const open = stack.pop();
      if (!open || open.c !== pairs[c]) {
        throw new Error(`${file}:${line} unbalanced '${c}'`);
      }
    }
  }

  if (mode && mode !== 'line') {
    throw new Error(`${file}: unterminated ${mode === 'block' ? 'comment' : 'string'} — file looks truncated`);
  }
  if (stack.length) {
    const open = stack[stack.length - 1];
    throw new Error(`${file}:${open.line} '${open.c}' is never closed — file looks truncated`);
  }
}

const parse = loadParser();
const files = process.argv.slice(2).filter((f) => EXTENSIONS.test(f));
const failures = [];

for (const file of files) {
  let code;
  try {
    code = readFileSync(file, 'utf8');
  } catch {
    continue; // deleted in this commit
  }

  if (code.trim() === '') continue;

  // A source file that does not end in a newline is the signature of a write
  // that was cut off. Cheap, and it caught the original bug on its own.
  if (!code.endsWith('\n')) {
    failures.push(`${file}: no trailing newline — the write may have been truncated`);
    continue;
  }

  try {
    if (parse) parse(code, file);
    else structuralCheck(code, file);
  } catch (err) {
    const loc = err.loc ? `:${err.loc.line}:${err.loc.column}` : '';
    failures.push(`${file}${loc} ${err.message}`);
  }
}

if (failures.length) {
  console.error('\nSyntax check failed:\n');
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error('\nFix the file(s) above, or re-write them in full if a tool truncated them.\n');
  process.exit(1);
}

console.log(`Syntax check passed (${files.length} file${files.length === 1 ? '' : 's'}).`);
