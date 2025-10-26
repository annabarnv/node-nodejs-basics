import { writeFile, access } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
    const filePath = join(__dirname, 'files', 'fresh.txt');

    try {
        await access(filePath);
        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code === 'ENOENT') {
            await writeFile(filePath, 'I am fresh and young');
        } else {
            throw new Error('FS operation failed');
        }
    }
};

await create();