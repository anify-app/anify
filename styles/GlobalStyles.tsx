import React from 'react'
import { createGlobalStyle } from 'styled-components'
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle`
  body {
    -webkit-tap-highlight-color: ${theme`colors.green.500`};
    ${tw`antialiased bg-gray-50! dark:bg-gray-900! text-gray-900 dark:text-gray-50 overflow-hidden`}
  }

  button, a {
    ${tw`focus:outline-none`}
  }

  * {
    ${tw`transition-colors`}
  }

  hr {
    box-sizing: border-box !important;
  }
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
)

export default GlobalStyles
