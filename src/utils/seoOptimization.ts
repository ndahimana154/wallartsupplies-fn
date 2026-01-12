export const LIGHTHOUSE_BEST_PRACTICES = {
    // Performance optimizations
    performance: {
        imageOptimization: {
            description: 'Use next-gen formats (WebP) with fallbacks',
            implementation: 'Already in use through lazy loading',
        },
        codeSpitting: {
            description: 'Code splitting for route-based chunks',
            implementation: 'Configure with Vite dynamic imports',
        },
        minification: {
            description: 'Minify CSS, JS, HTML',
            implementation: 'Vite handles this in build',
        },
    },

    // Accessibility improvements
    accessibility: {
        ariaLabels: 'Add aria-label to interactive elements',
        contrastRatio: 'Ensure 4.5:1 contrast for text',
        keyboardNavigation: 'Support tab navigation',
        altText: 'Include meaningful alt text for images',
        formLabels: 'Associate labels with form inputs',
    },

    // Best Practices
    bestPractices: {
        https: 'Ensure all resources loaded over HTTPS',
        noConsoleErrors: 'Fix all console errors and warnings',
        noDeprecatedAPIs: 'Remove deprecated API usage',
        csp: 'Implement Content Security Policy headers',
        secureHeaders: 'Add security headers',
    },

    // SEO
    seo: {
        metaTags: 'Include proper meta tags',
        structuredData: 'Add JSON-LD schema markup',
        mobileOptimized: 'Ensure mobile responsive design',
        pageTitles: 'Descriptive, unique titles',
        metaDescriptions: 'Compelling meta descriptions',
    },
};

export const generateMetaTags = (config: {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: string;
}) => {
    return {
        og: {
            title: config.title,
            description: config.description,
            image: config.image || '/main-logo1.jpg',
            type: config.type || 'website',
            url: config.url || window.location.href,
        },
        twitter: {
            card: 'summary_large_image',
            title: config.title,
            description: config.description,
            image: config.image || '/main-logo1.jpg',
        },
    };
};

export const trackWebVitals = async () => {
    if (typeof window !== 'undefined') {
        try {
            // Import the correct functions from web-vitals
            const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');

            // Track Core Web Vitals
            getCLS((metric) => {
                console.log('CLS:', metric.value);
            });
            getFID((metric) => {
                console.log('FID:', metric.value);
            });
            getFCP((metric) => {
                console.log('FCP:', metric.value);
            });
            getLCP((metric) => {
                console.log('LCP:', metric.value);
            });
            getTTFB((metric) => {
                console.log('TTFB:', metric.value);
            });
        } catch (error) {
            console.warn('web-vitals module not available', error);
        }
    }
};

export const preloadResources = () => {
    if (typeof document !== 'undefined') {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = 'https://fonts.googleapis.com';
        document.head.appendChild(link);

        const dnsPrefetch = document.createElement('link');
        dnsPrefetch.rel = 'dns-prefetch';
        dnsPrefetch.href = 'https://fonts.googleapis.com';
        document.head.appendChild(dnsPrefetch);
    }
};

export const optimizeImage = (src: string, width: number, height: number) => {
    return {
        src,
        width,
        height,
        loading: 'lazy' as const,
        decoding: 'async' as const,
    };
};

export const monitorPerformance = () => {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime =
            perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime =
            perfData.domComplete - perfData.domLoading;
        const domContentLoadedTime =
            perfData.domContentLoadedEventEnd - perfData.navigationStart;

        const metrics = {
            pageLoadTime,
            connectTime,
            renderTime,
            domContentLoadedTime,
        };

        console.log('Performance Metrics:', metrics);
        return metrics;
    }
};

export const trackEvent = (
    category: string,
    action: string,
    label?: string,
    value?: number
) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

export const generateSitemap = (
    routes: { path: string; priority: number; changefreq: string }[]
) => {
    const baseUrl = window.location.origin;
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
            .map(
                (route) => `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`
            )
            .join('')}
</urlset>`;
    return sitemap;
};

export const generateRobotsTxt = () => {
    return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: ${window.location.origin}/sitemap.xml

# Crawl delay to be respectful to servers
Crawl-delay: 1`;
};

export const structuredData = {
    organization: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Jinhua Hanji Company LTD',
        url: 'https://wallartsupplies.com',
        logo: 'https://wallartsupplies.com/main-logo1.jpg',
        description:
            'Creative wall art supplies and custom framing solutions',
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            telephone: '+1-800-000-0000',
            email: 'info@wallartsupplies.com',
        },
    },
    product: (product: any) => ({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image,
        offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'USD',
        },
    }),
    breadcrumb: (items: { name: string; url: string }[]) => ({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }),
};

export const setCacheHeaders = () => {
    if (typeof window !== 'undefined') {
        const headers = {
            'Cache-Control':
                'public, max-age=3600',
            'ETag': 'W/"resource-version"',
        };
        return headers;
    }
};