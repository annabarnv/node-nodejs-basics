import { cp, access } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
    const sourceDir = join(__dirname, 'files');
    const destDir = join(__dirname, 'files_copy');

    try {
        await access(sourceDir);

        try {
            await access(destDir);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code === 'ENOENT') {
                await cp(sourceDir, destDir, { recursive: true });
            } else {
                throw error;
            }
        }
    } catch (error) {
        if (error.message !== 'FS operation failed') {
            throw new Error('FS operation failed');
        }
        throw error;
    }
};

await copy();