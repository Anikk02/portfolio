import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [workspace, script, ...args] = process.argv.slice(2);

if (!workspace || !script) {
  console.error('Usage: node scripts/run-npm-script.mjs <workspace> <script> [...args]');
  process.exit(2);
}

const child = spawn(
  'npm',
  ['run', script, ...(args.length ? ['--', ...args] : [])],
  {
    cwd: path.resolve(repositoryRoot, workspace),
    stdio: 'inherit',
    shell: process.platform === 'win32',
  },
);

child.on('error', (error) => {
  console.error(`Failed to run npm script: ${error.message}`);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 1);
  }
});
