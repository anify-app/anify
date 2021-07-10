import Image from 'next/image'
import Link from 'next/link'
import { useColorMode } from '@chakra-ui/react'
import tw from 'twin.macro'

const Logo = () => {
  const { colorMode } = useColorMode()

  return (
    <Container>
      <Link href="/" passHref>
        <Image
          src={
            colorMode === 'dark' ? '/img/logo-dark.svg' : '/img/logo-light.svg'
          }
          alt=""
          layout="fixed"
          width={100.8} // 144px
          height={30.8} // 44px
          priority
        />
      </Link>
    </Container>
  )
}

export default Logo

const Container = tw.span`inline-flex items-center cursor-pointer`
