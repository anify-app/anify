import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: (() => {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
      return `https://${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/graphql`
    }
    if (
      process.env.NEXT_PUBLIC_VERCEL_URL &&
      process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'
    ) {
      return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/graphql`
    }

    console.log(
      'process.env.NEXT_PUBLIC_DEV_SERVER_URL',
      process.env.NEXT_PUBLIC_DEV_SERVER_URL,
    )
    return `${process.env.NEXT_PUBLIC_DEV_SERVER_URL}/api/graphql`
  })(),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          searchAnime: {
            keyArgs: ['query'],
            merge(existing: SearchResponse, incoming: SearchResponse) {
              if (!incoming) return existing
              if (!existing) return incoming

              const { hits, ...rest } = incoming

              let result: SearchResponse = {
                ...rest,
                hits: [...existing.hits, ...hits],
              }

              return result
            },
          },
        },
      },
    },
  }),
})

export default client
