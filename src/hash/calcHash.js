import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
    const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

    try {

        const readStream = createReadStream(filePath);

        const hash = createHash('sha256');

        await pipeline(
            readStream,
            hash
        );

        const hexHash = hash.digest('hex');

        console.log(hexHash);
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await calculateHash();