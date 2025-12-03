import { Helmet } from 'react-helmet-async';

const mainUrl =
  import.meta.env.VITE_FRONTEND_URL || 'https://www.wallartsupplies.com';

interface MainSEOData {
  title: string;
  description?: string;
  image?: string;
  author?: string;
  publishedAt?: string;
  type?: 'article' | 'website' | 'product';
}

interface SEOProps {
  mainData: MainSEOData;
  canonicalUrl?: string;
  twitterCreator?: string;
  iaMarkupUrl?: string;
  iaMarkupUrlDev?: string;
  iaRulesUrl?: string;
  iaRulesUrlDev?: string;
}

const makeAbsoluteUrl = (url: string) =>
  url?.startsWith('http') ? url : `${mainUrl}${url}`;

const SeoSetup = ({
  mainData,
  canonicalUrl = typeof window !== 'undefined' ? window.location.href : '',
  twitterCreator = '@WallArtsupplies',
  iaMarkupUrl = canonicalUrl,
  iaMarkupUrlDev,
  iaRulesUrl = `${mainUrl}/ia-rules.json`,
  iaRulesUrlDev,
}: SEOProps) => {
  const {
    title,
    description = 'We create premium wall décor, picture frames, and art supplies with a passion for quality and integrity. Trusted by customers worldwide for craftsmanship, fair pricing, and reliable service.',
    image = '/main-logo.svg',
    author = 'Wall Art Supplies',
    publishedAt = new Date().toISOString(),
    type = 'website',
  } = mainData as MainSEOData & { type?: string };

  const currentImage = makeAbsoluteUrl(image);
  const currentUrl = makeAbsoluteUrl(canonicalUrl);

  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': type === 'product' ? 'Product' : 'WebPage',
    headline: title,
    description,
    image: [currentImage],
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Wall Art Supplies',
      logo: {
        '@type': 'ImageObject',
        url: `${mainUrl}/main-logo.png`,
      },
    },
    mainEntityOfPage: currentUrl,
    datePublished: publishedAt,
  };

  return (
    <Helmet>
      <title>{title} | Wall Art Supplies</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta
        name="keywords"
        content="wall art, frames, picture frames, custom framing, art supplies, framing services, home decor"
      />

      <link rel="canonical" href={currentUrl} />

      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={currentImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={(mainData as any).type ?? 'website'} />
      <meta property="og:site_name" content="Wall Art Supplies" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={currentImage} />
      <meta name="twitter:creator" content={twitterCreator} />

      {iaMarkupUrl && <meta property="ia:markup_url" content={iaMarkupUrl} />}
      {iaMarkupUrlDev && (
        <meta property="ia:markup_url_dev" content={iaMarkupUrlDev} />
      )}
      {iaRulesUrl && <meta property="ia:rules_url" content={iaRulesUrl} />}
      {iaRulesUrlDev && (
        <meta property="ia:rules_url_dev" content={iaRulesUrlDev} />
      )}

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SeoSetup;
