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
import { format } from 'date-fns'
import { StatusBadge, GenreTag, SeasonTag, TypeBadge } from 'components/anime'
import { isPresent } from 'utils'
import { Tag } from '@chakra-ui/react'

type AnimePageProps = {
  anime: Anime
}

const AnimePage = ({ anime }: AnimePageProps) => {
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <Layout title={`${anime.title} - Anime Next App`} noPadding>
      <CoverContainer>
        <CoverNoise />
        {anime.mainImage ? (
          <CoverImageContainer>
            <Image
              src={anime.mainImage}
              layout="fill"
              objectFit="cover"
              alt=""
            />
          </CoverImageContainer>
        ) : null}
      </CoverContainer>

      <Content>
        <FirstRow>
          {anime.mainImage ? (
            <MainImageContainer>
              <Image
                src={anime.mainImage}
                width={225}
                height={350}
                layout="fixed"
                alt={`${anime.title} poster.`}
              />
            </MainImageContainer>
          ) : null}

          <TitleDescriptionContainer>
            <TitleContainer>
              <Title>{anime.title}</Title>
              <Badges>
                {anime.type ? <TypeBadge type={anime.type} /> : null}
                &nbsp;
                {anime.status ? <StatusBadge status={anime.status} /> : null}
              </Badges>
            </TitleContainer>
            <Genres>
              {anime.genres
                ? anime.genres
                    .filter(isPresent)
                    .map((genre, index) => (
                      <GenreTag key={`genre-${index}`}>{genre}</GenreTag>
                    ))
                : null}
            </Genres>
            <Description>
              {(anime.description
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
            </Description>

            {!expanded ? (
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

        <MoreInformation>
          <DetailsColumn>
            {anime.airedStart ? (
              <Label>
                <Field>Aired</Field>
                <Value>
                  {format(new Date(anime.airedStart), 'PPP')}
                  {anime.type !== 'movie'
                    ? ` to ${
                        anime.airedEnd
                          ? format(new Date(anime.airedEnd), 'PPP')
                          : '-'
                      }`
                    : null}
                </Value>
              </Label>
            ) : null}
            {anime.season && anime.airedStart ? (
              <Label>
                <Field>Premiered</Field>
                <TagList>
                  <SeasonTag>
                    {`${anime.season} ${format(
                      new Date(anime.airedStart),
                      'yyy',
                    )}`}
                  </SeasonTag>
                </TagList>
              </Label>
            ) : null}
            {anime.episodes && anime.type !== 'movie' ? (
              <Label>
                <Field>Episodes</Field>
                <Value>{anime.episodes}</Value>
              </Label>
            ) : null}
            {anime.duration ? (
              <Label>
                <Field>Duration</Field>
                <Value>{anime.duration}</Value>
              </Label>
            ) : null}
            {anime.sourceMaterialType ? (
              <Label>
                <Field>Source Material</Field>
                <Value>{anime.sourceMaterialType}</Value>
              </Label>
            ) : null}
            {anime.licensors?.length ? (
              <Label>
                <Field>Licensors</Field>
                <TagList>
                  {anime.licensors.map((licensor, index) => (
                    <React.Fragment key={`licensor-${index}`}>
                      <Tag size="sm">{licensor}</Tag>
                      &nbsp;
                    </React.Fragment>
                  ))}
                </TagList>
              </Label>
            ) : null}
            {anime.producers?.length ? (
              <Label>
                <Field>Producers</Field>
                <TagList>
                  {anime.producers.map((producer, index) => (
                    <React.Fragment key={`producer-${index}`}>
                      <Tag size="sm">{producer}</Tag>
                      &nbsp;
                    </React.Fragment>
                  ))}
                </TagList>
              </Label>
            ) : null}
            {anime.studios?.length ? (
              <Label>
                <Field>Studios</Field>
                <TagList>
                  {anime.studios.map((studio, index) => (
                    <React.Fragment key={`studio-${index}`}>
                      <Tag size="sm">{studio}</Tag>
                      &nbsp;
                    </React.Fragment>
                  ))}
                </TagList>
              </Label>
            ) : null}
          </DetailsColumn>
          <Placeholder />
        </MoreInformation>
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

  const paths = data.data.getAllAnime.map((item) => ({
    params: {
      slug: item.slug,
    },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<AnimePageProps, { slug: string }> =
  async ({ params }) => {
    const data = await client.query<{ getAnime: Query['getAnime'] }>({
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

    const anime = data.data.getAnime

    return { props: { anime } }
  }

const CoverContainer = tw.div`relative h-80! md:h-52! overflow-hidden`

const CoverImageContainer = tw.div`h-80! md:h-52! min-h-0! m-0! filter blur-3xl`

const FirstRow = tw.div`flex items-center md:items-start flex-col md:flex-row`

const MainImageContainer = tw.div`flex-shrink-0 -mt-80! md:-mt-36! mr-0! md:mr-14! z-10`

const Content = tw.div`m-auto max-w-6xl px-6 py-8 md:pb-10 md:pt-6`

const TitleDescriptionContainer = tw.div`relative mt-3 md:mt-0`

const TitleContainer = tw.div`flex items-center justify-center md:justify-start flex-col md:flex-row mb-1`

const Title = tw.h1`text-4xl md:text-3xl font-semibold text-center md:text-left mr-3 mb-0 md:mb-0.5`

const Badges = tw.div``

const Genres = tw.div`mt-3 mb-2 md:mt-0 leading-8 text-center md:text-left`

const Description = tw.p`text-gray-700 dark:text-gray-300`

const ExpandControls = tw(
  motion.div,
)`absolute flex justify-center items-end bottom-0 left-0 w-full`

const ExpandText = tw.p`font-bold text-gray-600 dark:text-gray-300 bg-gradient-to-t from-gray-50 dark:from-gray-900 h-32 md:h-16 p-2 w-full text-center flex items-end justify-center cursor-pointer`

const MoreInformation = tw.div`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mt-8`

const DetailsColumn = tw.div`bg-white dark:bg-gray-800 px-4 pt-4 pb-1 rounded`

const Placeholder = tw.div`col-span-1 md:col-span-3 xl:col-span-2`

const Label = tw.div`leading-5 mb-3`

const Field = tw.p`font-bold text-sm`

const Value = tw.span`text-gray-500 dark:text-gray-400 text-sm`

const TagList = tw.div`mt-1 -mb-1 leading-7`

const CoverNoise = styled.div`
  ${tw`absolute top-0 left-0 w-full h-full opacity-40`}
  background-image: url(data:image/png;base64,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);
`
