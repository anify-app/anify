import { Spinner as ChakraSpinner, useColorMode } from '@chakra-ui/react'

const Spinner = () => {
  const { colorMode } = useColorMode()

  return (
    <ChakraSpinner
      size="lg"
      color={
        colorMode === 'dark'
          ? 'var(--primary-color-dark)'
          : 'var(--primary-color)'
      }
    />
  )
}

export default Spinner
