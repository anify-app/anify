import tw, { styled } from 'twin.macro'
import { Link } from 'elements'
import { motion, AnimatePresence } from 'framer-motion'
import { HiHome, HiMoon } from 'react-icons/hi'
import { useWindowSize } from 'react-use'
import { Tooltip } from '@chakra-ui/tooltip'

type SideNavigationProps = {
  isExpanded: boolean
  onClose: () => void
  currentPath: string
  shouldFullyCollapse?: boolean
}

const SideNavigation = ({
  isExpanded,
  onClose,
  currentPath,
  shouldFullyCollapse,
}: SideNavigationProps) => {
  const { width } = useWindowSize()

  const isMobile = width < 768
  const collapsedWidth = isMobile || shouldFullyCollapse ? 0 : 70
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
          opacity: isExpanded || !(isMobile || shouldFullyCollapse) ? 1 : 0,
        }}
        transition={{ duration: 0.05 }}
      >
        <Navigation>
          <Tooltip
            label="Home"
            placement="right"
            hasArrow
            isDisabled={isMobile || shouldFullyCollapse || isExpanded}
          >
            {/* span needed here to pass Tooltip children ref */}
            <span>
              <NavigationItem href="/" active={currentPath === '/'}>
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
            isDisabled={isMobile || shouldFullyCollapse || isExpanded}
          >
            {/* span needed here to pass Tooltip children ref */}
            <span>
              <NavigationItem
                href="/anime"
                active={currentPath.startsWith('/anime')}
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
              opacity: 0.3,
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
      {shouldFullyCollapse || isMobile ? null : <Spacer />}
    </>
  )
}

export default SideNavigation

const Container = tw(
  motion.div,
)`bg-white dark:bg-black absolute top-0 left-0 h-full z-30 transition-all overflow-hidden md:overflow-visible`

const Navigation = tw.nav`overflow-hidden`

const HomeIcon = tw(HiHome)`h-6 w-6 flex-shrink-0`

const AnimeIcon = tw(HiMoon)`h-6 w-6 flex-shrink-0`

const NavigationItem = styled(Link)<{ active: boolean }>`
  ${tw`flex items-center px-6 h-12 transition-colors`}

  ${({ active }) =>
    active
      ? tw`bg-gray-200 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 font-semibold`
      : tw`bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900`}
  
  svg {
    ${({ active }) => (active ? tw`text-emerald-400` : tw``)}
  }
`

const NavigationRouteText = styled(motion.a)``

const Background = tw(
  motion.div,
)`absolute w-full h-full top-0 left-0 bg-gray-900 z-20`

const Spacer = styled.div`
  ${tw`h-full flex-shrink-0`}
  width: 70px;
`
