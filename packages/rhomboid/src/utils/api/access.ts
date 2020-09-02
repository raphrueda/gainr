let token: string;

export const setAccessToken = (newToken: string) => {
    token = newToken;
};

export const getAccessToken = () => {
    if (!token) {
        throw new Error('Token has not been set');
    }
    return token;
};
