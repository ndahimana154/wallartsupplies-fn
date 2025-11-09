import type { NewHeroAdApiValues } from "../../types/heroAd";
import axiosInstance from "../axiosInstance";
import { handleError } from "./welcome";

const newHeroAdRequest = async (data: NewHeroAdApiValues) => {
    try {
        const response = await axiosInstance.post("/api/hero-ads/new", data);
        return response.data
    } catch (error) {
        return handleError(error);
    }
}

export default {
    newHeroAdRequest
}