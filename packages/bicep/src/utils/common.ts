export const getEnvVar = (key: string): string => {
    if (!process.env[key]) {
        throw new Error(`${key} is not defined`);
    }
    return process.env[key]!;
};
