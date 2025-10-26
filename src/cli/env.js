const parseEnv = () => {
    const rssVariables = Object.entries(process.env)
        .filter(([key]) => key.startsWith('RSS_'))
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');

    if (rssVariables) {
        console.log(rssVariables);
    }
};

parseEnv();