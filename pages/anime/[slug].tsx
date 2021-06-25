import { useState } from 'react'
import { Layout } from 'components/display'
import { GetStaticProps, GetStaticPaths } from 'next'
import { gql } from '@apollo/client'
import client from 'apollo/client'
import tw from 'twin.macro'
import { Divider } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import _ from 'lodash'
import Image from 'next/image'

type AnimePageProps = {
  anime: Anime
}

const AnimePage = ({ anime }: AnimePageProps) => {
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <Layout title={`${anime.title} - Anime Next App`} noPadding>
      <CoverContainer>
        <CoverOverlay />
        <Cover
          src="https://i.redd.it/tfqiq1aqjx351.png"
          layout="fill"
          objectFit="cover"
        />
      </CoverContainer>

      <Content>
        <FirstRow>
          {anime.mainImage ? <MainImage src={anime.mainImage} /> : null}

          <TitleDescriptionContainer>
            <Title>{anime.title}</Title>
            <Description>
              {(anime.description
                ? _.truncate(anime.description, {
                    length: expanded ? Infinity : 500,
                    // split the description into an array of paragraphs
                  }).split('\n')
                : ['']
              )
                // use line breaks between paragraphs
                .map((text) => (
                  <>
                    {text}
                    <br />
                  </>
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

const CoverContainer = tw.div`relative h-80! md:h-52!`

const CoverOverlay = tw.div`absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-t from-gray-900 opacity-0 dark:opacity-70 transition-opacity`

const Cover = tw(Image)`h-80! md:h-52! min-h-0! m-0!`

const FirstRow = tw.div`flex items-center md:items-start flex-col md:flex-row`

const MainImage = tw.img`-mt-80 md:-mt-48 z-10 mr-0 md:mr-14 flex-shrink-0`

const Content = tw.div`m-auto max-w-6xl px-6 py-8 md:pb-10 md:pt-6`

const TitleDescriptionContainer = tw.div`relative mt-4 md:mt-0`

const Title = tw.h1`text-4xl md:text-3xl font-semibold mb-2 text-center md:text-left`

const Description = tw.p`text-gray-700 dark:text-gray-300`

const ExpandControls = tw(
  motion.div,
)`absolute flex justify-center items-end bottom-0 left-0 w-full`

const ExpandText = tw.p`font-bold text-gray-600 dark:text-gray-300 bg-gradient-to-t from-gray-50 dark:from-gray-900 h-32 md:h-16 p-2 w-full text-center flex items-end justify-center cursor-pointer`
