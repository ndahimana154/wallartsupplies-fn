import type { HeroAdFilters, NewHeroAdApiValues, QueryOptions } from "../../types/heroAd";
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
const getAllHeroAdsRequest = async (filters: HeroAdFilters = {}, queries: QueryOptions = {}) => {
    try {
        const params: any = {};

        if (filters.title) params.title = filters.title;
        if (filters.description) params.description = filters.description;
        if (filters.isActive !== undefined) params.isActive = filters.isActive;

        if (queries.page) params.page = queries.page;
        if (queries.limit) params.limit = queries.limit;
        if (queries.sortBy) params.sortBy = queries.sortBy;
        if (queries.order) params.order = queries.order;

        const response = await axiosInstance.get("/api/hero-ads/get-all", { params });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

const deleteHeroAdRequest = async () => {
    try {

        const response = await axiosInstance.get("/api/hero-ads/");
        return response.data
    } catch (error) {
        return handleError(error)
    }
}

const updateHeroAdRequest = async (id: number, data: any) => {
    try {
        const response = await axiosInstance.get(`/api/hero-ads/${id}`, data);
        return response.data
    } catch (error) {
        return handleError(error)
    }
}

export default {
    newHeroAdRequest,
    getAllHeroAdsRequest,
    deleteHeroAdRequest,
    updateHeroAdRequest
}