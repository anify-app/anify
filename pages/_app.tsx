import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import chakraTheme from 'styles/charkraTheme'
import GlobalStyles from 'styles/GlobalStyles'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={chakraTheme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
