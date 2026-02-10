/**
 * useGlobalLoading Hook
 * Provides global loading state from Redux API slice
 * Eliminates need for local useState loading in components
 */
import { useAppSelector } from '../store/hooks';

export const useGlobalLoading = () => {
    const apiStatus = useAppSelector((state) => state.api.status);
    const isLoading = apiStatus === 'loading';
    const isError = apiStatus === 'error';
    const isSuccess = apiStatus === 'success';
    const isIdle = apiStatus === 'idle';

    return {
        isLoading,
        isError,
        isSuccess,
        isIdle,
        status: apiStatus,
    };
};

export default useGlobalLoading;
