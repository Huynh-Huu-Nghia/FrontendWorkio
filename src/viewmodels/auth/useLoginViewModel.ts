import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import type { LoginRequest } from '../../models/auth';
import { authRepository } from '../../repositories/auth/AuthRepository';

export const useLoginViewModel = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const login = useCallback(async (payload: LoginRequest) => {
        setIsLoading(true);
        setError(null);
        try {
            await authRepository.login(payload);
            toast.success('Đăng nhập thành công!');
            setTimeout(() => navigate('/home'), 800);
            // keep loading until navigate
        } catch (e: any) {
            const message = e?.response?.data?.message || e?.message || 'Email hoặc mật khẩu không đúng.';
            setError(message);
            toast.error(message);
            setIsLoading(false);
        }
    }, [navigate]);

    return { isLoading, error, login };
};

export type UseLoginViewModelReturn = ReturnType<typeof useLoginViewModel>;
