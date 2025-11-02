import type { LoginData } from "../../types/auth";
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

export default {
    loginRequest
}