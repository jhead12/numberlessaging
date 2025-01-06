import Head from 'next/head';

export default function SEO({ title, description, imageUrl, url }) {
  return (
    <Head>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Retirement, Performance Boost, Workout Recovery, Energy Booster, Fitness, Aging" />
      <meta name="author" content="Numbered Aging" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph / Social Media */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Your Brand Name" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content="@YourTwitterHandle" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}