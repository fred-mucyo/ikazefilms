import { Helmet } from 'react-helmet-async';

// default SEO values (used when nothing is passed)
const defaultSEO = {
  title: '🎬 Hashye.online - Stream Movies & Shows in HD',
  description:
    'Discover, watch, and enjoy the latest movies and shows in HD with Hashye.online',
  image: '/hashye-preview.png', // should exist in /public
  url: 'https://hashye.online/',
  type: 'website',
};

export default function useSEO({
  title = defaultSEO.title,
  description = defaultSEO.description,
  image = defaultSEO.image,
  url = defaultSEO.url,
  type = defaultSEO.type,
}) {
  return (
    <Helmet>
      {/* Primary Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph (FB, IG, TikTok, LinkedIn, WhatsApp) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Hashye" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
