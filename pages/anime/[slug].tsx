import React from 'react'
import { Layout } from 'components/display'
import { GetStaticProps, GetStaticPaths } from 'next'
import tw from 'twin.macro'
import { Divider } from '@chakra-ui/react'
import _ from 'lodash'
import {
  MainInformation,
  CoverImage,
  MoreInformationColumn,
} from 'components/anime-page'
import { DynamoDB } from 'services/dynamodb'

type AnimePageProps = {
  anime: Anime | null
}

const AnimePage = ({ anime }: AnimePageProps) => {
  if (anime === null) return <p>404</p>

  const isLoaded = anime !== undefined

  return (
    <Layout
      title={`${anime?.title || 'Loading'} - Anime Next App`}
      noPadding
      shouldFullyCollapse
    >
      <CoverImage isLoaded={isLoaded} mainImage={anime?.mainImage} />

      <Content>
        <MainInformation isLoaded={isLoaded} anime={anime} />
        <Divider p={4} />
        <MoreInformationColumn isLoaded={isLoaded} anime={anime} />
      </Content>
    </Layout>
  )
}

export default AnimePage

const Content = tw.div`m-auto max-w-6xl px-6 py-8 md:pb-10 md:pt-6`

export const getStaticPaths: GetStaticPaths = async () => {
  // use mock-data for local development
  if (process.env.NODE_ENV === 'development') {
    return {
      paths: [
        {
          params: {
            slug: 'One-Piece',
          },
        },
        {
          params: {
            slug: 'Heavy',
          },
        },
      ],
      fallback: true,
    }
  }

  const dynamo = new DynamoDB()

  const animes = await dynamo.getAllAnime({
    first: null,
    last: null,
    skip: null,
  })

  const paths = animes
    // TODO: remove this once our database data is good
    .filter((item) => item.slug)
    .map((item) => ({
      params: {
        slug: item.slug,
      },
    }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps<AnimePageProps, { slug: string }> =
  async ({ params }) => {
    const dynamo = new DynamoDB()

    const data = await dynamo.getAnime({ slug: params?.slug || '' })

    const anime = data

    return {
      props: { anime },
      // pre-render becomes outdated after 5 minutes
      revalidate: 300,
    }
  }
