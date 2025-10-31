import axiosInstance from "../axiosInstance";

export const handleError = (error: unknown): { status: number; message: string } => {
    if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as any).response === 'object' &&
        (error as any).response !== null
    ) {
        const err = error as {
            response: {
                status: number;
                data?: {
                    message?: string;
                };
            };
        };

        return {
            status: err.response.status,
            message: err.response.data?.message || 'Something went wrong. Please try again.',
        };
    }

    return {
        status: 500,
        message: (error as Error).message || 'Unexpected error occurred. Please try again.',
    };
};

const welcomeRequest = async () => {
    try {
        const response = await axiosInstance.get("/api/user/");
        return response.data
    } catch (error) {
        return handleError(error)
    }
}

export default {
    welcomeRequest
}