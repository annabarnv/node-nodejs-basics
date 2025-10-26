const { Worker } = require('worker_threads');
const os = require('os');
const path = require('path');

const performCalculations = async () => {
    const numCores = os.cpus().length;
    const workers = [];
    const results = [];

    for (let i = 0; i < numCores; i++) {
        const workerPromise = new Promise((resolve) => {
            const worker = new Worker(path.join(__dirname, 'worker.js'));
            const num = 10 + i;
            worker.on('message', (data) => {
                resolve({
                    status: 'resolved',
                    data: data
                });
                worker.terminate();
            });

            worker.on('error', () => {
                resolve({
                    status: 'error',
                    data: null
                });
                worker.terminate();
            });

            worker.postMessage(num);
        });

        workers.push(workerPromise);
    }

    const workerResults = await Promise.all(workers);

    console.log(workerResults);
};

await performCalculations();