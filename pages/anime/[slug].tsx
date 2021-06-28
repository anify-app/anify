import React, { useState } from 'react'
import { Layout } from 'components/display'
import { GetStaticProps, GetStaticPaths } from 'next'
import { gql } from '@apollo/client'
import client from 'apollo/client'
import tw, { styled } from 'twin.macro'
import { Divider } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import _ from 'lodash'
import Image from 'next/image'
import {
  StatusBadge,
  GenreTag,
  TypeBadge,
  CoverImage,
  MoreInformationColumn,
} from 'components/anime-page'
import { isPresent } from 'utils'
import { Skeleton } from '@chakra-ui/react'

type AnimePageProps = {
  anime: Anime | null
}

const AnimePage = ({ anime }: AnimePageProps) => {
  const [expanded, setExpanded] = useState<boolean>(false)

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
        <FirstRow>
          <MainImageContainer>
            <Skeleton isLoaded={isLoaded} opacity={1} width={225} height={350}>
              {anime?.mainImage ? (
                <Image
                  src={anime.mainImage}
                  width={225}
                  height={350}
                  layout="fixed"
                  alt={`${anime?.title} poster.`}
                />
              ) : null}
            </Skeleton>
          </MainImageContainer>

          <TitleDescriptionContainer>
            <TitleSkeleton isLoaded={isLoaded}>
              <Title>{anime?.title}</Title>

              <Badges>
                {anime?.type ? <TypeBadge type={anime.type} /> : null}
                &nbsp;
                {anime?.status ? <StatusBadge status={anime.status} /> : null}
              </Badges>
            </TitleSkeleton>

            <GenreSkeleton isLoaded={isLoaded}>
              {anime?.genres
                ? anime.genres
                    .filter(isPresent)
                    .map((genre, index) => (
                      <GenreTag key={`genre-${index}`}>{genre}</GenreTag>
                    ))
                : null}
            </GenreSkeleton>

            <DescriptionSkeleton isLoaded={isLoaded}>
              <p>
                {(anime?.description
                  ? _.truncate(anime.description, {
                      length: expanded ? Infinity : 500,
                      // split the description into an array of paragraphs
                    }).split('\n')
                  : ['']
                )
                  // use line breaks between paragraphs
                  .map((text, index) => (
                    <React.Fragment key={`description-${index}`}>
                      {text}
                      <br />
                    </React.Fragment>
                  ))}
              </p>
            </DescriptionSkeleton>

            {!expanded && isLoaded ? (
              <ExpandControls
                initial={{ opacity: 0 }}
                whileHover={{ opacity: expanded ? 0 : 1 }}
                transition={{ duration: 0.1 }}
              >
                <ExpandText onClick={() => setExpanded(true)}>
                  Read More
                </ExpandText>
              </ExpandControls>
            ) : null}
          </TitleDescriptionContainer>
        </FirstRow>

        <Divider p={4} />

        <MoreInformationColumn isLoaded={isLoaded} anime={anime} />
      </Content>
    </Layout>
  )
}

export default AnimePage

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

  const data = await client.query<{ getAllAnime: Query['getAllAnime'] }>({
    query: gql`
      query getAllAnime {
        getAllAnime {
          slug
        }
      }
    `,
  })

  const paths = data.data.getAllAnime
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
    const data = await client
      .query<{ getAnime: Query['getAnime'] }>({
        query: gql`
          query getAnime($slug: String!) {
            getAnime(slug: $slug) {
              title
              season
              description
              episodes
              englishTitle
              type
              status
              duration
              airedStart
              airedEnd
              mainImage
              japaneseTitle
              sourceMaterialType
              synonyms
              studios
              genres
              producers
              licensors
              sources {
                name
                url
              }
            }
          }
        `,
        variables: {
          slug: params?.slug || '',
        },
      })
      .catch(() => {
        return {
          data: {
            getAnime: null,
          },
        }
      })

    const anime = data.data.getAnime

    return {
      props: { anime },
      // pre-render becomes outdated after 5 minutes
      revalidate: 300,
    }
  }

const FirstRow = tw.div`flex items-center md:items-start flex-col md:flex-row`

const MainImageContainer = tw.div`flex-shrink-0 -mt-80! md:-mt-36! mr-0! md:mr-14! z-10`

const Content = tw.div`m-auto max-w-6xl px-6 py-8 md:pb-10 md:pt-6`

const TitleDescriptionContainer = tw.div`relative mt-3 md:mt-0 w-full`

const TitleSkeleton = tw(
  Skeleton,
)`flex items-center justify-center md:justify-start flex-col md:flex-row mb-2 h-8`

const Title = tw.h1`text-4xl md:text-3xl font-semibold text-center md:text-left mr-3 mb-0 md:mb-0.5`

const Badges = tw.div``

const GenreSkeleton = tw(
  Skeleton,
)`mt-3 mb-2 md:mt-0 leading-8 text-center md:text-left h-6`

const DescriptionSkeleton = styled(Skeleton)<{ isLoaded: boolean }>`
  ${tw`text-gray-700 dark:text-gray-300`}
  ${({ isLoaded }) => (isLoaded ? tw`h-auto` : tw`h-28`)}
`

const ExpandControls = tw(
  motion.div,
)`absolute flex justify-center items-end bottom-0 left-0 w-full`

const ExpandText = tw.p`font-bold text-gray-600 dark:text-gray-300 bg-gradient-to-t from-gray-50 dark:from-gray-900 h-32 md:h-16 p-2 w-full text-center flex items-end justify-center cursor-pointer`
