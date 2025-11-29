import { adminPhone } from "../utils/axiosInstance";

export const whatsAppClick = () => {

    const message = `Hello, I'm interested in your products and i'd like to know more about customization options and shipping.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};