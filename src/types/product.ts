export interface NewProductApiValues {
    name: string;
    price: number;
    moq: number;
    description: string;
    images: string[];
    categoryId: number;
    customAttr: { key: string; value: string }[];
}

export interface NewProductValues {
    name: string;
    price: number;
    moq: number;
    description: string;
    images: (File | string)[];
    categoryId: number;
    customAttr: { key: string; value: string }[];
    imagesTouched?: boolean;
}

export interface UpdateProductValues {
    name: string;
    price: number;
    moq: number;
    description: string;
    images: (File | string)[];
    categoryId: number;
    customAttr: { key: string; value: string }[];
    imagesTouched?: boolean;
    status?: boolean;
}

export interface ProductData {
    id: number;
    name: string;
    price: number;
    moq: number;
    description: string;
    images: File[];
    categoryId: number | '';
    category: CategoryData
    customAttr: { key: string; value: string }[];
    slug: string;
    status: boolean;
    relatedProducts?: ProductData[]
}

export interface NewProductFormValues {
    name: string;
    price: number;
    moq: number;
    description: string;
    images: File[];
    categoryId: number | '';
    customAttr: { key: string; value: string }[];
    imagesTouched?: boolean;
}

export interface CategoryData {
    id: number
    name: string;
    slug: string;
    image: string;
}

export interface UpdateCategoryData {
    name: string;
    image: string;
}


export interface NewCategoryValues {
    name: string;
    image: any;
}


export interface CategoriesFilters {
    name?: string;
}

export interface ProductsFilters {
    search?: string
}