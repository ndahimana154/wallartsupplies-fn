import type { QueryOptions } from "../../types/heroAd";
import type { CategoriesFilters, NewCategoryValues, NewProductValues, ProductsFilters, UpdateCategoryData, UpdateProductValues } from "../../types/product";
import { api } from "../api";

const newProductRequest = async (data: NewProductValues) =>
    api.post("/api/product/new", data);

const getProducts = async () =>
    api.get("/api/product/list-all-products");

const getRecentFrames = async (filters: ProductsFilters, queries: QueryOptions) => {
    const params: any = {};

    if (filters.search) params.search = filters.search;
    if (queries.page) params.page = queries.page;
    if (queries.limit) params.limit = queries.limit;
    if (queries.sortBy) params.sortBy = queries.sortBy;
    if (queries.order) params.order = queries.order;

    return api.get("/api/product/customer-get-recent-collections", params);
};

const getProductBySlug = async (slug: string) =>
    api.get(`/api/product/customer-get-product/${slug}`);

const newCategoryRequest = async (data: NewCategoryValues) =>
    api.post("/api/product/category/new", data);

const getCategories = async (filters: CategoriesFilters, queries: QueryOptions) => {
    const params: any = {};

    if (filters.name) params.name = filters.name;
    if (queries.page) params.page = queries.page;
    if (queries.limit) params.limit = queries.limit;
    if (queries.sortBy) params.sortBy = queries.sortBy;
    if (queries.order) params.order = queries.order;

    return api.get("/api/product/category/list", params);
};

const getBestCategories = async () =>
    api.get("/api/product/customer-get-best-categories");

const getCategoryProducts = async (slug: string) =>
    api.get(`/api/product/category/customer-get-products/${slug}`);

const updateCategoryRequest = async (id: number, data: UpdateCategoryData) =>
    api.put(`/api/product/category/update/${id}`, data);

const updateProductRequest = async (id: number, data: UpdateProductValues) =>
    api.put(`/api/product/edit/${id}`, data);

const updateProductStatusRequest = async (id: number, status: boolean) =>
    api.put(`/api/product/edit/${id}`, { status });

const getDashoardData = async () =>
    api.get("/api/product/get-dashboard-data");

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
    getDashoardData,
};
