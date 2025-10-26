import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
    const scriptPath = join(__dirname, 'files', 'script.js');
    const childProcess = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc']
    });
    process.stdin.pipe(childProcess.stdin);
    childProcess.stdout.pipe(process.stdout);
    childProcess.on('exit', (code) => {
    });
};

spawnChildProcess(/* [someArgument1, someArgument2, ...] */);