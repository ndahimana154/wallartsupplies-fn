import { useNavigate } from "react-router-dom";
import { adminPhone, frontendUrl } from "../utils/axiosInstance";
import type { ProductData } from "../types/product";

export const useNavigation = () => {
    const navigate = useNavigate();

    const whatsAppClick = (productName?: string) => {
        const baseMessage = `Hello, I'm interested in your products and I'd like to know more about customization options and shipping.`;

        const message = productName
            ? `${baseMessage}\n\nSpecifically, I'm interested in: ${productName}`
            : baseMessage;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    const handleProductClick = (slug: string) => {
        navigate(`/product-detail/${slug}`);
        window.scrollTo(0, 0);
    };

    const handleWhatsAppClick = (frame: ProductData) => {
        const productLink = `${frontendUrl}/product-detail/${frame.slug}`;
        const message = `Hello, I want to know more information about ${frame.name}. Product link: ${productLink}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };
    return {
        whatsAppClick,
        handleProductClick,
        handleWhatsAppClick
    };
};
