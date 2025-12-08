import axiosInstance from "../axiosInstance"
import { handleError } from "./welcome"

const askChatbot = async (message: string) => {
    try {
        const response = await axiosInstance.post("/api/chatbot/ask", { message })
        return response.data
    } catch (error) {
        return handleError(error)
    }
}

export default {
    askChatbot
}