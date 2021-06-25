import { Layout } from 'components/display'
import { GetStaticProps, GetStaticPaths } from 'next'
import { gql } from '@apollo/client'
import client from 'apollo/client'

type AnimePageProps = {
  anime: Anime
}

const AnimePage = ({ anime }: AnimePageProps) => {
  return (
    <Layout>
      {anime.mainImage ? <img src={anime.mainImage} /> : null}
      <h1>{anime.title}</h1>
      <p>{anime.description}</p>
    </Layout>
  )
}

export default AnimePage

export const getStaticPaths: GetStaticPaths = async () => {
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
