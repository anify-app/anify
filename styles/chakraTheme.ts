import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import colors from 'tailwindcss/colors'

const theme = extendTheme({
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
  colors: {
    green: colors.emerald,
    gray: colors.gray,
  },
})

export default theme
