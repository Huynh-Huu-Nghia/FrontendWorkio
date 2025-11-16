export type AuthRole = 'admin' | 'recruiter' | 'candidate';

export type LoginRequest = {
    email: string;
    password: string;
    role: AuthRole;
};

export type TokenPair = {
    accessToken: string;
    refreshToken: string;
};

export type AuthUser = {
    id: string;
    fullName: string;
    email: string;
    avatar?: string;
    role: string;
};

export type AuthResult = {
    tokens: TokenPair;
    user: AuthUser;
};

export type ApiResponse<T> = {
    statusCode?: number;
    message?: string;
    result: T;
};
