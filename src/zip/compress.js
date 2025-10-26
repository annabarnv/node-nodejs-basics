const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const compress = async () => {
    const inputPath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const outputPath = path.join(__dirname, 'files', 'archive.gz');

    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(inputPath);
        const writeStream = fs.createWriteStream(outputPath);
        const gzip = zlib.createGzip();
        readStream
            .pipe(gzip)
            .pipe(writeStream)
            .on('finish', () => {
                console.log('Compression completed');
                resolve();
            })
            .on('error', reject);
    });
};

await compress();