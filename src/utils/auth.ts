const AUTH_KEY = 'auth';

type AuthPayload = {
    token: string;
    expiry: number; // epoch ms
};

export const setAuth = (token: string, ttlSeconds = 7200) => {
    const payload: AuthPayload = {
        token,
        expiry: Date.now() + ttlSeconds * 1000,
    };
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(payload));
};

export const getAuth = (): AuthPayload | null => {
    const raw = sessionStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as AuthPayload;
    } catch (err) {
        return null;
    }
};

export const getToken = (): string | null => {
    const auth = getAuth();
    return auth?.token ?? null;
};

export const isExpired = (): boolean => {
    const auth = getAuth();
    if (!auth) return true;
    return Date.now() > auth.expiry;
};

export const clearAuth = () => {
    sessionStorage.removeItem(AUTH_KEY);
};

export default {
    setAuth,
    getAuth,
    getToken,
    isExpired,
    clearAuth,
};
