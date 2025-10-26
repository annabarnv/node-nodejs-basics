const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const decompress = async () => {
    const inputPath = path.join(__dirname, 'files', 'archive.gz');
    const outputPath = path.join(__dirname, 'files', 'fileToCompress.txt');
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(inputPath);
        const writeStream = fs.createWriteStream(outputPath);
        const gunzip = zlib.createGunzip();
        readStream
            .pipe(gunzip)
            .pipe(writeStream)
            .on('finish', () => {
                console.log('Decompression completed');
                resolve();
            })
            .on('error', reject);
    });
};

await decompress();