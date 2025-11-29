export interface CustomInquiriesApiValues {
    fullNames: string;
    email: string;
    phone: string;
    projectDescription: string;
    images: string[];
}
export interface CustomInquiriesData {
    id: number;
    fullNames: string;
    email: string;
    phone: string;
    projectDescription: string;
    images: string[];
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface InquiriesFilters {
    fullNames?: string;
    email?: string;
    phone?: string;
    status?: string;
}