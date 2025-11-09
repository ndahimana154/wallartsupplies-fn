export interface QueryOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: "ASC" | "DESC";
}

export interface NewHeroAdApiValues {
    title: string;
    description: string;
    buttonText: string;
    link: string;
    image: string;
}

export interface iHeroAds {
    id: number;
    title: string;
    description: string;
    buttonText: string;
    link: string;
    image: string;
    isActive: boolean
}

export interface HeroAdFilters {
    title?: string;
    description?: string;
    isActive?: boolean;
}