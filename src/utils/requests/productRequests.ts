import type { NewCategoryValues, NewProductValues } from "../../types/product";
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




const newCategoryRequest = async (data: NewCategoryValues) => {
    try {
        const response = await axiosInstance.post("/api/product/category/new", data);
        return response.data
    } catch (error) {
        return handleError(error);
    }
}

const getCategories = async () => {
    try {
        const response = await axiosInstance.get("/api/product/category/list");
        return response.data
    } catch (error) {
        return handleError(error)
    }
}

export default {
    newProductRequest,
    newCategoryRequest,
    getCategories,
    getProducts
}