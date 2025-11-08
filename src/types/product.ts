export interface NewProductApiValues {
    name: string;
    price: number;
    moq: number;
    description: string;
    images: string[]; // Only URLs for API
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
    name: string;
    slug: number;
}

export interface NewCategoryValues {
    name: string;
}
