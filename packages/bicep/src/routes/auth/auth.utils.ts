import { sign } from 'jsonwebtoken';

export const generateRefreshToken = (userId: number, expiry: string = '7d') => {
    if (!process.env?.REFRESH_TOKEN_SECRET) {
        console.error('Missing refresh secret.');
        throw new Error('Something went wrong.');
    }
    return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: expiry,
    });
};

export const generateAccessToken = (userId: number, expiry: string = '15m') => {
    if (!process.env?.ACCESS_TOKEN_SECRET) {
        console.error('Missing access secret.');
        throw new Error('Something went wrong.');
    }
    return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: expiry,
    });
};
