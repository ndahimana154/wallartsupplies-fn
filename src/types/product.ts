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
    id: string
    name: string;
    slug: number;
    image: string;
}

export interface NewCategoryValues {
    name: string;
    image: any;
}
