import type { ForgotPasswordData, LoginData, ResetPasswordData, VerifyForgotPasswordTokenData } from "../../types/auth";
import axiosInstance from "../axiosInstance";
import { handleError } from "./welcome";

const loginRequest = async (data: LoginData) => {
    try {
        const response = await axiosInstance.post("/api/user/login", data);
        return response.data
    } catch (error) {
        return handleError(error);
    }
}

const forgotPasswordRequest = async (data: ForgotPasswordData) => {
    try {
        const response = await axiosInstance.post("/api/user/forgot-password", data);
        return response.data
    } catch (error) {
        return handleError(error)
    }
}

const verifyForgotPasswordToken = async (data: VerifyForgotPasswordTokenData) => {
    try {
        const response = await axiosInstance.post("/api/user/verify-reset-token", data);
        return response.data
    } catch (error) {
        return handleError(error);
    }
}

const resetPasswordRequest = async (data: ResetPasswordData) => {
    try {
        const response = await axiosInstance.put("/api/user/reset-password", data);
        return response.data
    } catch (error) {
        return handleError(error)
    }
}

const getProfileRequest = async () => {
    try {
        const response = await axiosInstance.get("/api/user/profile");
        return response.data
    }
    catch (error) {
        return handleError(error)
    }
}

const updateprofileRequest = async (data: any) => {
    try {
        const response = await axiosInstance.put("/api/user/update-profile", data);
        return response.data
    } catch (error) {
        return handleError(error)
    }
}

export default {
    loginRequest,
    forgotPasswordRequest,
    verifyForgotPasswordToken,
    resetPasswordRequest,
    getProfileRequest,
    updateprofileRequest
}