import type { AuthResult, LoginRequest, TokenPair, AuthUser } from '../../models/auth';
import { authApiService } from '../../api/services/AuthApiService';
import { AuthStorage } from '../../utils/authStorage';

export interface IAuthRepository {
    login(payload: LoginRequest): Promise<AuthResult>;
}

export class AuthRepository implements IAuthRepository {
    async login(payload: LoginRequest): Promise<AuthResult> {
        const result = await authApiService.login(payload);

        const tokens: TokenPair = {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken ?? '',
        };

        AuthStorage.setTokens(tokens);
        AuthStorage.setRole(payload.role);

        let user: AuthUser | undefined = result.user;
        if (!user) {
            try {
                user = await authApiService.getAccount();
            } catch {
                // Nếu BE không cung cấp endpoint account, vẫn trả tokens để FE tự xử lý tiếp
            }
        }

        return { tokens, user: (user as AuthUser) } satisfies AuthResult;
    }
}

export const authRepository = new AuthRepository();
