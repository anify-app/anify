import React from 'react'
import { createGlobalStyle } from 'styled-components'
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle`
  body {
    -webkit-tap-highlight-color: ${theme`colors.emerald.500`};
    ${tw`antialiased bg-gray-50! dark:bg-gray-900! text-gray-900 dark:text-gray-50 overflow-hidden`}
    
    --primary-color: ${theme`colors.emerald.500`};
    --primary-color-dark: ${theme`colors.emerald.200`};
    --primary-color-hover: ${theme`colors.emerald.600`};
    --primary-color-dark-hover: ${theme`colors.emerald.300`};
  }

  button, a {
    ${tw`focus:outline-none`}
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
