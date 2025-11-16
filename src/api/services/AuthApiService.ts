import { axiosInstance } from '../../utils/axios';
import type { ApiResponse, LoginRequest, AuthUser } from '../../models/auth';

// Minimal DTO matching backend's expected response shape used in the app today.
type AuthResponseDto = {
    accessToken: string;
    refreshToken?: string;
    user?: AuthUser;
};

export class AuthApiService {
    async login(payload: LoginRequest): Promise<AuthResponseDto> {
        const { email, password, role } = payload;
        let loginUrl: string;

        switch (role) {
            case 'admin':
                loginUrl = '/admin-auth/login';
                break;
            case 'recruiter':
                loginUrl = '/recruiter/auth/login';
                break;
            case 'candidate':
                loginUrl = '/candidate/auth/login';
                break;
            default:
                throw new Error('Vai trò không hợp lệ');
        }

        const res = await axiosInstance.post(loginUrl, { email, password });

        const raw = res?.data;
        const body = (raw && (raw.result ?? raw)) || {};

        const accessToken =
            body.accessToken ||
            body.access_token ||
            body.token?.accessToken ||
            body.token?.access_token ||
            body.tokens?.accessToken ||
            body.tokens?.access_token;
        const refreshToken =
            body.refreshToken ||
            body.refresh_token ||
            body.token?.refreshToken ||
            body.token?.refresh_token ||
            body.tokens?.refreshToken ||
            body.tokens?.refresh_token;
        const user: AuthUser | undefined = body.user || body.account || body.profile;

        if (!accessToken) {
            // Trả lại message server nếu có để dễ debug
            const serverMsg = raw?.message || body?.message;
            throw new Error(serverMsg || 'Phản hồi không hợp lệ từ máy chủ');
        }

        return { accessToken, refreshToken, user } as AuthResponseDto;
    }

    async getAccount(): Promise<AuthUser> {
        const res = await axiosInstance.get<ApiResponse<AuthUser>>('/api/v1/auth/account');
        if (!res?.data?.result) {
            throw new Error(res?.data?.message || 'Không lấy được thông tin tài khoản');
        }
        return res.data.result;
    }
}

export const authApiService = new AuthApiService();
