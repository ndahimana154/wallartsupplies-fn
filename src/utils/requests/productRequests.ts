import type { QueryOptions } from "../../types/heroAd";
import type { CategoriesFilters, NewCategoryValues, NewProductValues, ProductsFilters, UpdateCategoryData, UpdateProductValues } from "../../types/product";
import axiosInstance from "../axiosInstance";
import { handleError } from "./welcome";

const newProductRequest = async (data: NewProductValues) => {
    try {
        const response = await axiosInstance.post("/api/product/new", data);
        return response.data
    } catch (error) {
        return handleError(error);
    }
}

const getProducts = async () => {
    try {
        const response = await axiosInstance.get("/api/product/list-all-products");
        return response.data
    } catch (error) {
        return handleError(error);
    }
}

const getRecentFrames = async (filters: ProductsFilters, queries: QueryOptions) => {
    try {
        const params: any = {}

        if (filters.name) params.name = filters.name

        if (queries.page) params.page = queries.page;
        if (queries.limit) params.limit = queries.limit;
        if (queries.sortBy) params.sortBy = queries.sortBy;
        if (queries.order) params.order = queries.order;

        const response = await axiosInstance.get("/api/product/customer-get-recent-collections", { params });
        return response.data
    } catch (error) {
        return handleError(error);
    }
}

const getProductBySlug = async (slug: string) => {
    try {
        const response = await axiosInstance.get(`/api/product/customer-get-product/${slug}`)
        return response.data
    } catch (error) {
        return handleError(error)
    }
}


const newCategoryRequest = async (data: NewCategoryValues) => {
    try {
        const response = await axiosInstance.post("/api/product/category/new", data);
        return response.data
    } catch (error) {
        return handleError(error);
    }
}

const getCategories = async (filters: CategoriesFilters, queries: QueryOptions) => {
    try {
        const params: any = {}

        if (filters.name) params.name = filters.name

        if (queries.page) params.page = queries.page;
        if (queries.limit) params.limit = queries.limit;
        if (queries.sortBy) params.sortBy = queries.sortBy;
        if (queries.order) params.order = queries.order;

        const response = await axiosInstance.get("/api/product/category/list", { params });
        return response.data
    } catch (error) {
        return handleError(error)
    }
}

const getBestCategories = async () => {
    try {
        const response = await axiosInstance.get("/api/product/customer-get-best-categories");
        return response.data
    } catch (error) {
        return handleError(error)
    }
}

const getCategoryProducts = async (slug: string) => {
    try {
        const response = await axiosInstance.get(`/api/product/category/customer-get-products/${slug}`)
        return response.data
    } catch (error) {
        return handleError(error)
    }
}

const updateCategoryRequest = async (id: number, data: UpdateCategoryData) => {
    try {
        const response = await axiosInstance.put(`/api/product/category/update/${id}`, data);
        return response.data;
    } catch (error: any) {
        return handleError(error);
    }
}

const updateProductRequest = async (id: number, data: UpdateProductValues) => {
    try {
        const response = await axiosInstance.put(`/api/product/edit/${id}`, data)
        return response.data
    } catch (error: any) {
        return handleError(error)
    }
}

const updateProductStatusRequest = async (id: number, status: boolean) => {
    try {
        const response = await axiosInstance.put(`/api/product/edit/${id}`, { status })
        return response.data
    } catch (error: any) {
        return handleError(error)
    }
}

const getDashoardData = async () => {
    try {
        const response = await axiosInstance.get("/api/product/get-dashboard-data");
        return response.data
    } catch (error) {
        return handleError(error)
    }
}

export default {
    newProductRequest,
    newCategoryRequest,
    getCategories,
    getProducts,
    getRecentFrames,
    getProductBySlug,
    getBestCategories,
    getCategoryProducts,
    updateCategoryRequest,
    updateProductRequest,
    updateProductStatusRequest,
    getDashoardData
}