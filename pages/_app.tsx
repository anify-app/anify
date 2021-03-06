import type { AppProps } from 'next/app'
import { GlobalStyles, Chakra } from 'styles'
import { ThemeProvider } from 'next-themes'
import { ApolloProvider } from '@apollo/client'
import client from 'apollo/client'
import 'overlayscrollbars/css/OverlayScrollbars.css'
import 'swiper/css'
import 'swiper/css/navigation'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
        <Chakra>
          <GlobalStyles />
          <Component {...pageProps} />
        </Chakra>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp
