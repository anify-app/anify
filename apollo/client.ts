import { ApolloClient, InMemoryCache, QueryResult } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/graphql`
    : 'http://localhost:3000/api/graphql',
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
