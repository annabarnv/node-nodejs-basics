import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
    const filePath = join(__dirname, 'files', 'fileToWrite.txt');

    const writeStream = createWriteStream(filePath);

    await pipeline(
        process.stdin,
        writeStream
    );
};

await write();