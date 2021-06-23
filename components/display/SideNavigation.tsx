import tw, { styled } from 'twin.macro'
import { Link } from 'elements'
import { motion } from 'framer-motion'
import { HiHome, HiMoon } from 'react-icons/hi'
import { useRouter } from 'next/router'

type SideNavigationProps = {
  isExpanded: boolean
}

const SideNavigation = ({ isExpanded }: SideNavigationProps) => {
  const router = useRouter()

  return (
    <>
      <Container
        animate={{
          width: isExpanded ? 300 : 70,
        }}
        transition={{ duration: 0.05 }}
        style={{ width: 70 }}
      >
        <Navigation>
          <NavigationItem href="/" active={router.pathname === '/'}>
            <HomeIcon />
            {isExpanded ? (
              <NavigationRouteText
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.1 }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;Home
              </NavigationRouteText>
            ) : null}
          </NavigationItem>
          <NavigationItem href="/anime" active={router.pathname === '/anime'}>
            <AnimeIcon />
            {isExpanded ? (
              <NavigationRouteText
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.1 }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;Anime
              </NavigationRouteText>
            ) : null}
          </NavigationItem>
        </Navigation>
      </Container>

      {isExpanded ? (
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
      ) : null}

      {/* spacer so content can account for the spacer width since it's position absolute */}
      <Spacer />
    </>
  )
}

export default SideNavigation

const Container = tw(
  motion.div,
)`bg-white absolute top-0 left-0 h-full z-10 transition-all`

const Navigation = tw.nav``

const HomeIcon = tw(HiHome)`h-5 w-5 flex-shrink-0`

const AnimeIcon = tw(HiMoon)`h-5 w-5 flex-shrink-0`

const NavigationItem = styled(Link)<{ active: boolean }>`
  ${tw`flex items-center px-6 h-12`}
  ${({ active }) =>
    active
      ? tw`text-gray-900 bg-gray-200 hover:bg-gray-100 font-semibold`
      : tw`text-gray-900 bg-white hover:bg-gray-100 `}
  
  svg {
    ${({ active }) => (active ? tw`text-green-400` : tw`text-gray-900`)}
  }
`

const NavigationRouteText = styled(motion.a)``

const Background = tw(
  motion.div,
)`absolute w-full h-full top-0 left-0 bg-gray-900 opacity-20`

const Spacer = styled.div`
  ${tw`h-full`}
  width: 70px;
`
