import type { CustomInquiriesApiValues, InquiriesFilters } from "../../types/customInquiries";
import type { QueryOptions } from "../../types/heroAd";
import axiosInstance from "../axiosInstance";
import { handleError } from "./welcome";

const newCustomInquiry = async (data: CustomInquiriesApiValues) => {
    try {
        const response = await axiosInstance.post("/api/inquiries/new", data)
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

const getAllInquiries = async (filters: InquiriesFilters, queries: QueryOptions) => {
    try {
        const params: any = {};

        if (filters.fullNames) params.fullNames = filters.fullNames;
        if (filters.email) params.email = filters.email;
        if (filters.phone) params.phone = filters.phone;
        if (filters.status) params.status = filters.status;

        if (queries.page) params.page = queries.page;
        if (queries.limit) params.limit = queries.limit;
        if (queries.sortBy) params.sortBy = queries.sortBy;
        if (queries.order) params.order = queries.order;

        const response = await axiosInstance.get("/api/inquiries/all", { params });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

const toggleResolvedStatus = async (inquiryId: number, status: String) => {
    try {
        console.log("Toggling status for inquiry ID:", inquiryId, "to status:", status);
        const response = await axiosInstance.put(`/api/inquiries/toggle-resolved/${inquiryId}`, { status });
        return response.data;
    }
    catch (error) {
        return handleError(error);
    }
}

export default {
    newCustomInquiry,
    getAllInquiries,
    toggleResolvedStatus
}