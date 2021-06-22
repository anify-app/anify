import tw, { styled } from 'twin.macro'
import { Link } from 'elements'
import { motion } from 'framer-motion'
import { HiHome, HiMoon } from 'react-icons/hi'
import { useRouter } from 'next/router'

const SideNavigation = () => {
  const router = useRouter()

  return (
    <>
      <Container
        initial={{
          // opacity: 0,
          translateX: -300,
        }}
        animate={{
          // opacity: 1,
          translateX: 0,
        }}
        exit={{
          // opacity: 0,
          translateX: -300,
        }}
        transition={{ duration: 0.2 }}
      >
        <Navigation>
          <NavigationItem href="/" active={router.pathname === '/'}>
            <HomeIcon />
            &nbsp;&nbsp;&nbsp;&nbsp;Home
          </NavigationItem>
          <NavigationItem href="/anime" active={router.pathname === '/anime'}>
            <AnimeIcon />
            &nbsp;&nbsp;&nbsp;&nbsp;Anime
          </NavigationItem>
        </Navigation>
      </Container>

      <Background
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.2,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}

export default SideNavigation

const Container = tw(
  motion.div,
)`bg-white absolute top-0 left-0 h-full w-72 z-10`

const Navigation = tw.nav``

const HomeIcon = tw(HiHome)`text-xl`

const AnimeIcon = tw(HiMoon)`text-xl`

const NavigationItem = styled(Link)<{ active: boolean }>`
  ${tw`flex items-center py-3 px-6`}
  ${({ active }) =>
    active
      ? tw`text-gray-900 bg-gray-200 hover:bg-gray-100 font-semibold`
      : tw`text-gray-900 bg-white hover:bg-gray-100 `}
  
  svg {
    ${({ active }) => (active ? tw`text-green-400` : tw`text-gray-900`)}
  }
`

const Background = tw(
  motion.div,
)`absolute w-full h-full top-0 left-0 bg-gray-900 opacity-20`
