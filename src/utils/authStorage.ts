import type { TokenPair, AuthRole } from '../models/auth';

const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';
const ROLE_KEY = 'authRole';

export const AuthStorage = {
    setTokens(tokens: TokenPair) {
        localStorage.setItem(ACCESS_KEY, tokens.accessToken);
        localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
    },
    getAccessToken(): string | null {
        return localStorage.getItem(ACCESS_KEY);
    },
    getRefreshToken(): string | null {
        return localStorage.getItem(REFRESH_KEY);
    },
    setRole(role: AuthRole) {
        localStorage.setItem(ROLE_KEY, role);
    },
    getRole(): AuthRole | null {
        const r = localStorage.getItem(ROLE_KEY) as AuthRole | null;
        return r;
    },
    clear() {
        localStorage.removeItem(ACCESS_KEY);
        localStorage.removeItem(REFRESH_KEY);
        localStorage.removeItem(ROLE_KEY);
    },
};
