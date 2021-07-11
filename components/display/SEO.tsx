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
      <link rel="icon" href="/favicon.ico" />
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
    </Head>
  )
}

export default SEO
