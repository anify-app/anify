import React from 'react'
import Head from 'next/head'

export type SEOProps = {
  title: string
  url: string
  description: string
  image: string
}

const SEO = ({ title, url, description, image }: SEOProps) => {
  return (
    <Head>
      <title>{title}</title>
      <link
        rel="canonical"
        href={`https://${process.env.NEXT_PUBLIC_PRODUCTION_URL}${url}`}
      />

      {/* General */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      {/* Open Graph */}
      <meta
        property="og:url"
        content={`https://${process.env.NEXT_PUBLIC_PRODUCTION_URL}${url}`}
      />
      <meta
        property="og:type"
        content={url.includes('blog') ? 'article' : 'website'}
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* favicon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#111827" />
      <meta name="theme-color" content="#111827" />
    </Head>
  )
}

export default SEO
