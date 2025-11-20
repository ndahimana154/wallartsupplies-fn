import { Helmet } from 'react-helmet-async';

const mainUrl = 'https://www.wallartsupplies.com';
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
    author = 'Ndahimana Bonheur',
    publishedAt = '2023-12-01T10:00:00Z',
  } = mainData;

  const currentImage = makeAbsoluteUrl(image);
  const currentUrl = makeAbsoluteUrl(canonicalUrl);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    headline: title,
    description,
    image: [currentImage],
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kickside Rwanda',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.wallartsupplies.com/main-logo.png',
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
        content="Kickside, Rwanda News, Tech, Sports, Entertainment, Kigali"
      />

      <link rel="canonical" href={currentUrl} />

      <meta property="og:locale" content="en_RW" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={currentImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Kickside Rwanda" />

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
