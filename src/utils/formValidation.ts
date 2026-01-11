import * as Yup from 'yup';

export const COUNTRY_CODES = [
    // North America
    { code: 'US', dial: '+1', name: 'United States' },
    { code: 'CA', dial: '+1', name: 'Canada' },
    { code: 'MX', dial: '+52', name: 'Mexico' },

    // Caribbean
    { code: 'BS', dial: '+1-242', name: 'Bahamas' },
    { code: 'BB', dial: '+1-246', name: 'Barbados' },
    { code: 'CU', dial: '+53', name: 'Cuba' },
    { code: 'DO', dial: '+1-809', name: 'Dominican Republic' },
    { code: 'HT', dial: '+509', name: 'Haiti' },
    { code: 'JM', dial: '+1-876', name: 'Jamaica' },
    { code: 'PR', dial: '+1-787', name: 'Puerto Rico' },
    { code: 'TT', dial: '+1-868', name: 'Trinidad and Tobago' },

    // Central America
    { code: 'CR', dial: '+506', name: 'Costa Rica' },
    { code: 'SV', dial: '+503', name: 'El Salvador' },
    { code: 'GT', dial: '+502', name: 'Guatemala' },
    { code: 'HN', dial: '+504', name: 'Honduras' },
    { code: 'NI', dial: '+505', name: 'Nicaragua' },
    { code: 'PA', dial: '+507', name: 'Panama' },

    // South America
    { code: 'AR', dial: '+54', name: 'Argentina' },
    { code: 'BO', dial: '+591', name: 'Bolivia' },
    { code: 'BR', dial: '+55', name: 'Brazil' },
    { code: 'CL', dial: '+56', name: 'Chile' },
    { code: 'CO', dial: '+57', name: 'Colombia' },
    { code: 'EC', dial: '+593', name: 'Ecuador' },
    { code: 'GY', dial: '+592', name: 'Guyana' },
    { code: 'PY', dial: '+595', name: 'Paraguay' },
    { code: 'PE', dial: '+51', name: 'Peru' },
    { code: 'SR', dial: '+597', name: 'Suriname' },
    { code: 'UY', dial: '+598', name: 'Uruguay' },
    { code: 'VE', dial: '+58', name: 'Venezuela' },

    // Europe
    { code: 'AL', dial: '+355', name: 'Albania' },
    { code: 'AD', dial: '+376', name: 'Andorra' },
    { code: 'AT', dial: '+43', name: 'Austria' },
    { code: 'BY', dial: '+375', name: 'Belarus' },
    { code: 'BE', dial: '+32', name: 'Belgium' },
    { code: 'BA', dial: '+387', name: 'Bosnia and Herzegovina' },
    { code: 'BG', dial: '+359', name: 'Bulgaria' },
    { code: 'HR', dial: '+385', name: 'Croatia' },
    { code: 'CY', dial: '+357', name: 'Cyprus' },
    { code: 'CZ', dial: '+420', name: 'Czech Republic' },
    { code: 'DK', dial: '+45', name: 'Denmark' },
    { code: 'EE', dial: '+372', name: 'Estonia' },
    { code: 'FI', dial: '+358', name: 'Finland' },
    { code: 'FR', dial: '+33', name: 'France' },
    { code: 'DE', dial: '+49', name: 'Germany' },
    { code: 'GR', dial: '+30', name: 'Greece' },
    { code: 'HU', dial: '+36', name: 'Hungary' },
    { code: 'IS', dial: '+354', name: 'Iceland' },
    { code: 'IE', dial: '+353', name: 'Ireland' },
    { code: 'IT', dial: '+39', name: 'Italy' },
    { code: 'LV', dial: '+371', name: 'Latvia' },
    { code: 'LI', dial: '+423', name: 'Liechtenstein' },
    { code: 'LT', dial: '+370', name: 'Lithuania' },
    { code: 'LU', dial: '+352', name: 'Luxembourg' },
    { code: 'MT', dial: '+356', name: 'Malta' },
    { code: 'MD', dial: '+373', name: 'Moldova' },
    { code: 'MC', dial: '+377', name: 'Monaco' },
    { code: 'ME', dial: '+382', name: 'Montenegro' },
    { code: 'NL', dial: '+31', name: 'Netherlands' },
    { code: 'MK', dial: '+389', name: 'North Macedonia' },
    { code: 'NO', dial: '+47', name: 'Norway' },
    { code: 'PL', dial: '+48', name: 'Poland' },
    { code: 'PT', dial: '+351', name: 'Portugal' },
    { code: 'RO', dial: '+40', name: 'Romania' },
    { code: 'RU', dial: '+7', name: 'Russia' },
    { code: 'SM', dial: '+378', name: 'San Marino' },
    { code: 'RS', dial: '+381', name: 'Serbia' },
    { code: 'SK', dial: '+421', name: 'Slovakia' },
    { code: 'SI', dial: '+386', name: 'Slovenia' },
    { code: 'ES', dial: '+34', name: 'Spain' },
    { code: 'SE', dial: '+46', name: 'Sweden' },
    { code: 'CH', dial: '+41', name: 'Switzerland' },
    { code: 'UA', dial: '+380', name: 'Ukraine' },
    { code: 'GB', dial: '+44', name: 'United Kingdom' },
    { code: 'VA', dial: '+379', name: 'Vatican City' },

    // Middle East
    { code: 'BH', dial: '+973', name: 'Bahrain' },
    { code: 'IR', dial: '+98', name: 'Iran' },
    { code: 'IQ', dial: '+964', name: 'Iraq' },
    { code: 'IL', dial: '+972', name: 'Israel' },
    { code: 'JO', dial: '+962', name: 'Jordan' },
    { code: 'KW', dial: '+965', name: 'Kuwait' },
    { code: 'LB', dial: '+961', name: 'Lebanon' },
    { code: 'OM', dial: '+968', name: 'Oman' },
    { code: 'PS', dial: '+970', name: 'Palestine' },
    { code: 'QA', dial: '+974', name: 'Qatar' },
    { code: 'SA', dial: '+966', name: 'Saudi Arabia' },
    { code: 'SY', dial: '+963', name: 'Syria' },
    { code: 'TR', dial: '+90', name: 'Turkey' },
    { code: 'AE', dial: '+971', name: 'United Arab Emirates' },
    { code: 'YE', dial: '+967', name: 'Yemen' },

    // Africa
    { code: 'DZ', dial: '+213', name: 'Algeria' },
    { code: 'AO', dial: '+244', name: 'Angola' },
    { code: 'BJ', dial: '+229', name: 'Benin' },
    { code: 'BW', dial: '+267', name: 'Botswana' },
    { code: 'BF', dial: '+226', name: 'Burkina Faso' },
    { code: 'BI', dial: '+257', name: 'Burundi' },
    { code: 'CV', dial: '+238', name: 'Cape Verde' },
    { code: 'CM', dial: '+237', name: 'Cameroon' },
    { code: 'CF', dial: '+236', name: 'Central African Republic' },
    { code: 'TD', dial: '+235', name: 'Chad' },
    { code: 'KM', dial: '+269', name: 'Comoros' },
    { code: 'CG', dial: '+242', name: 'Congo' },
    { code: 'CD', dial: '+243', name: 'Democratic Republic of the Congo' },
    { code: 'DJ', dial: '+253', name: 'Djibouti' },
    { code: 'EG', dial: '+20', name: 'Egypt' },
    { code: 'GQ', dial: '+240', name: 'Equatorial Guinea' },
    { code: 'ER', dial: '+291', name: 'Eritrea' },
    { code: 'SZ', dial: '+268', name: 'Eswatini' },
    { code: 'ET', dial: '+251', name: 'Ethiopia' },
    { code: 'GA', dial: '+241', name: 'Gabon' },
    { code: 'GM', dial: '+220', name: 'Gambia' },
    { code: 'GH', dial: '+233', name: 'Ghana' },
    { code: 'GN', dial: '+224', name: 'Guinea' },
    { code: 'GW', dial: '+245', name: 'Guinea-Bissau' },
    { code: 'KE', dial: '+254', name: 'Kenya' },
    { code: 'LS', dial: '+266', name: 'Lesotho' },
    { code: 'LR', dial: '+231', name: 'Liberia' },
    { code: 'LY', dial: '+218', name: 'Libya' },
    { code: 'MG', dial: '+261', name: 'Madagascar' },
    { code: 'MW', dial: '+265', name: 'Malawi' },
    { code: 'ML', dial: '+223', name: 'Mali' },
    { code: 'MR', dial: '+222', name: 'Mauritania' },
    { code: 'MU', dial: '+230', name: 'Mauritius' },
    { code: 'MA', dial: '+212', name: 'Morocco' },
    { code: 'MZ', dial: '+258', name: 'Mozambique' },
    { code: 'NA', dial: '+264', name: 'Namibia' },
    { code: 'NE', dial: '+227', name: 'Niger' },
    { code: 'NG', dial: '+234', name: 'Nigeria' },
    { code: 'RW', dial: '+250', name: 'Rwanda' },
    { code: 'ST', dial: '+239', name: 'São Tomé and Príncipe' },
    { code: 'SN', dial: '+221', name: 'Senegal' },
    { code: 'SC', dial: '+248', name: 'Seychelles' },
    { code: 'SL', dial: '+232', name: 'Sierra Leone' },
    { code: 'SO', dial: '+252', name: 'Somalia' },
    { code: 'ZA', dial: '+27', name: 'South Africa' },
    { code: 'SS', dial: '+211', name: 'South Sudan' },
    { code: 'SD', dial: '+249', name: 'Sudan' },
    { code: 'TZ', dial: '+255', name: 'Tanzania' },
    { code: 'TG', dial: '+228', name: 'Togo' },
    { code: 'TN', dial: '+216', name: 'Tunisia' },
    { code: 'UG', dial: '+256', name: 'Uganda' },
    { code: 'ZM', dial: '+260', name: 'Zambia' },
    { code: 'ZW', dial: '+263', name: 'Zimbabwe' },

    // Asia
    { code: 'AF', dial: '+93', name: 'Afghanistan' },
    { code: 'AM', dial: '+374', name: 'Armenia' },
    { code: 'AZ', dial: '+994', name: 'Azerbaijan' },
    { code: 'BD', dial: '+880', name: 'Bangladesh' },
    { code: 'BT', dial: '+975', name: 'Bhutan' },
    { code: 'BN', dial: '+673', name: 'Brunei' },
    { code: 'KH', dial: '+855', name: 'Cambodia' },
    { code: 'CN', dial: '+86', name: 'China' },
    { code: 'GE', dial: '+995', name: 'Georgia' },
    { code: 'IN', dial: '+91', name: 'India' },
    { code: 'ID', dial: '+62', name: 'Indonesia' },
    { code: 'JP', dial: '+81', name: 'Japan' },
    { code: 'KZ', dial: '+7', name: 'Kazakhstan' },
    { code: 'KG', dial: '+996', name: 'Kyrgyzstan' },
    { code: 'LA', dial: '+856', name: 'Laos' },
    { code: 'MY', dial: '+60', name: 'Malaysia' },
    { code: 'MV', dial: '+960', name: 'Maldives' },
    { code: 'MN', dial: '+976', name: 'Mongolia' },
    { code: 'MM', dial: '+95', name: 'Myanmar' },
    { code: 'NP', dial: '+977', name: 'Nepal' },
    { code: 'KP', dial: '+850', name: 'North Korea' },
    { code: 'PK', dial: '+92', name: 'Pakistan' },
    { code: 'PH', dial: '+63', name: 'Philippines' },
    { code: 'SG', dial: '+65', name: 'Singapore' },
    { code: 'KR', dial: '+82', name: 'South Korea' },
    { code: 'LK', dial: '+94', name: 'Sri Lanka' },
    { code: 'TW', dial: '+886', name: 'Taiwan' },
    { code: 'TJ', dial: '+992', name: 'Tajikistan' },
    { code: 'TH', dial: '+66', name: 'Thailand' },
    { code: 'TM', dial: '+993', name: 'Turkmenistan' },
    { code: 'UZ', dial: '+998', name: 'Uzbekistan' },
    { code: 'VN', dial: '+84', name: 'Vietnam' },

    // Oceania
    { code: 'AS', dial: '+1-684', name: 'American Samoa' },
    { code: 'AU', dial: '+61', name: 'Australia' },
    { code: 'FJ', dial: '+679', name: 'Fiji' },
    { code: 'GU', dial: '+1-671', name: 'Guam' },
    { code: 'KI', dial: '+686', name: 'Kiribati' },
    { code: 'MH', dial: '+692', name: 'Marshall Islands' },
    { code: 'FM', dial: '+691', name: 'Micronesia' },
    { code: 'NR', dial: '+674', name: 'Nauru' },
    { code: 'NC', dial: '+687', name: 'New Caledonia' },
    { code: 'NZ', dial: '+64', name: 'New Zealand' },
    { code: 'PW', dial: '+680', name: 'Palau' },
    { code: 'PG', dial: '+675', name: 'Papua New Guinea' },
    { code: 'WS', dial: '+685', name: 'Samoa' },
    { code: 'SB', dial: '+677', name: 'Solomon Islands' },
    { code: 'TO', dial: '+676', name: 'Tonga' },
    { code: 'TV', dial: '+688', name: 'Tuvalu' },
    { code: 'VU', dial: '+678', name: 'Vanuatu' },
];
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PHONE_REGEX = /^[\d\s\-\+\(\)]{10,20}$/;

export const URL_REGEX = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

export const contactUsValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters')
        .matches(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
        .required('Full name is required'),
    email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email address is required'),
    countryCode: Yup.string().required('Country code is required'),
    phone: Yup.string()
        .matches(PHONE_REGEX, 'Please enter a valid phone number')
        .required('Phone number is required'),
    description: Yup.string()
        .min(20, 'Project description must be at least 20 characters')
        .max(2000, 'Project description must be less than 2000 characters')
        .required('Project description is required'),
});

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

export const signupValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters')
        .required('First name is required'),
    lastName: Yup.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters')
        .required('Last name is required'),
    email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
});

export const productValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Product name must be at least 3 characters')
        .max(150, 'Product name must be less than 150 characters')
        .required('Product name is required'),
    description: Yup.string()
        .min(10, 'Description must be at least 10 characters')
        .max(3000, 'Description must be less than 3000 characters')
        .required('Description is required'),
    price: Yup.number()
        .positive('Price must be greater than 0')
        .required('Price is required'),
    category: Yup.string().required('Category is required'),
});

export const getErrorMessage = (error: any): string => {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    return 'An error occurred';
};

export const validateFile = (
    file: File,
    maxSizeMB: number = 10,
    allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/webp']
): { valid: boolean; error?: string } => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxSizeBytes) {
        return {
            valid: false,
            error: `File size must be less than ${maxSizeMB}MB`,
        };
    }

    if (!allowedTypes.includes(file.type)) {
        return {
            valid: false,
            error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`,
        };
    }

    return { valid: true };
};

export const formatPhoneNumber = (countryCode: string, phone: string): string => {
    const country = COUNTRY_CODES.find((c) => c.code === countryCode);
    if (!country) return phone;

    const cleanPhone = phone.replace(/\D/g, '');

    if (country.dial === '+1') {
        return `${country.dial} (${cleanPhone.slice(0, 3)}) ${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6)}`;
    }

    return `${country.dial} ${cleanPhone}`;
};
