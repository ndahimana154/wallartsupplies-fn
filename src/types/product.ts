export interface NewProductValues {
    name: string;
    price: number;
    moq: number;
    description: string;
    images: File[];
    categoryId: number | '';
    customAttr: { key: string; value: string }[];
    imagesTouched?: boolean
}

export interface ProductData {
    name: string;
    price: number;
    moq: number;
    description: string;
    images: File[];
    categoryId: number | '';
    category: CategoryData
    customAttr: { key: string; value: string }[];
    status: boolean;
}

export interface CategoryData {
    name: string;
    slug: number;
}
export interface NewCategoryValues {
    name: string;
}
