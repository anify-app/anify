import { ChakraProvider, localStorageManager } from '@chakra-ui/react'
import chakraTheme from 'styles/chakraTheme'

export const Chakra = ({ children }: { children: React.ReactNode }) => {
  const colorModeManager = localStorageManager

  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={chakraTheme}>
      {children}
    </ChakraProvider>
  )
}
