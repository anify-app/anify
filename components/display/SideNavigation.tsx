import tw, { styled } from 'twin.macro'
import { Link } from 'elements'
import { motion, AnimatePresence } from 'framer-motion'
import { HiHome, HiMoon } from 'react-icons/hi'
import { useRouter } from 'next/router'
import { useWindowSize } from 'react-use'
import { Tooltip } from '@chakra-ui/tooltip'

type SideNavigationProps = {
  isExpanded: boolean
  onClose: () => void
}

const SideNavigation = ({ isExpanded, onClose }: SideNavigationProps) => {
  const router = useRouter()
  const { width } = useWindowSize()

  const isMobile = width < 768
  const collapsedWidth = isMobile ? 0 : 70
  const expandedWidth = isMobile ? '90%' : 300

  return (
    <>
      <Container
        initial={{
          width: collapsedWidth,
        }}
        animate={{
          width: isExpanded ? expandedWidth : collapsedWidth,
          // visible if expanded or on desktop
          opacity: isExpanded || !isMobile ? 1 : 0,
        }}
        transition={{ duration: 0.05 }}
      >
        <Navigation>
          <Tooltip
            label="Home"
            placement="right"
            hasArrow
            isDisabled={isMobile || isExpanded}
          >
            {/* span needed here to pass Tooltip children ref */}
            <span>
              <NavigationItem href="/" active={router.pathname === '/'}>
                <HomeIcon />

                <AnimatePresence>
                  {isExpanded ? (
                    <NavigationRouteText
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.1, duration: 0.1 }}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;Home
                    </NavigationRouteText>
                  ) : null}
                </AnimatePresence>
              </NavigationItem>
            </span>
          </Tooltip>
          <Tooltip
            label="Anime"
            placement="right"
            hasArrow
            isDisabled={isMobile || isExpanded}
          >
            {/* span needed here to pass Tooltip children ref */}
            <span>
              <NavigationItem
                href="/anime"
                active={router.pathname === '/anime'}
              >
                <AnimeIcon />
                <AnimatePresence>
                  {isExpanded ? (
                    <NavigationRouteText
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.1, duration: 0.1 }}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;Anime
                    </NavigationRouteText>
                  ) : null}
                </AnimatePresence>
              </NavigationItem>
            </span>
          </Tooltip>
        </Navigation>
      </Container>

      <AnimatePresence>
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
            onClick={onClose}
          />
        ) : null}
      </AnimatePresence>

      {/* spacer so content can account for the spacer width since it's position absolute */}
      {isMobile ? null : <Spacer />}
    </>
  )
}

export default SideNavigation

const Container = tw(
  motion.div,
)`bg-white absolute top-0 left-0 h-full z-20 transition-all overflow-hidden md:overflow-visible`

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
)`absolute w-full h-full top-0 left-0 bg-gray-900 opacity-20 z-10`

const Spacer = styled.div`
  ${tw`h-full`}
  width: 70px;
`
