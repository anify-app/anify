import type { AppProps } from 'next/app'
import { GlobalStyles, Chakra } from 'styles'
import { ThemeProvider } from 'next-themes'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <Chakra>
        <GlobalStyles />
        <Component {...pageProps} />
      </Chakra>
    </ThemeProvider>
  )
}

export default MyApp
