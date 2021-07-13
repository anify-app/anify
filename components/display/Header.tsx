import { useState, useEffect, useRef } from 'react'
import tw, { styled } from 'twin.macro'
import { HiMenu, HiCog } from 'react-icons/hi'
import { Switch, useColorMode } from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { useClickAway } from 'react-use'
import Logo from './Logo'
import { Search } from 'components/anime-search'

type HeaderTypes = {
  onHamburgerClick: () => void
}

const Header = ({ onHamburgerClick }: HeaderTypes) => {
  const settingsMenuRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const { colorMode, toggleColorMode } = useColorMode()

  // close settings menu if clicked outside
  useClickAway(settingsMenuRef, () => {
    setIsSettingsMenuOpen(false)
  })

  // don't render dependent theme UI until mounted on the client
  useEffect(() => setMounted(true), [])

  // sync tailwind and chakra UI
  useEffect(() => {
    if (resolvedTheme !== colorMode) toggleColorMode()
  }, [colorMode, resolvedTheme, toggleColorMode])

  const toggleDarkMode = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    toggleColorMode()
  }

  return (
    <>
      <Container>
        <HamburgerButton onClick={onHamburgerClick} />

        <Logo />

        <Search />

        <Settings ref={settingsMenuRef}>
          <SettingsButton
            onClick={() => setIsSettingsMenuOpen(!isSettingsMenuOpen)}
          />

          <AnimatePresence>
            {isSettingsMenuOpen ? (
              <SettingsMenu
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.1,
                }}
              >
                <SettingsMenuItem onMouseDown={toggleDarkMode}>
                  <SettingsMenuText>Dark Mode</SettingsMenuText>
                  {mounted ? (
                    <Switch
                      isChecked={resolvedTheme === 'dark'}
                      colorScheme="green"
                      size="sm"
                    />
                  ) : null}
                </SettingsMenuItem>
              </SettingsMenu>
            ) : null}
          </AnimatePresence>
        </Settings>
      </Container>
    </>
  )
}

export default Header

const Container = styled.div`
  ${tw`relative bg-white dark:bg-black grid py-3 px-6 items-center transition-colors shadow-sm dark:shadow-none z-30`}
  grid-template-columns: auto auto 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: auto 1fr auto auto;
  }
`

const HamburgerButton = tw(
  HiMenu,
)`h-6 w-6 mr-7 cursor-pointer hover:color[var(--primary-color)] dark:hover:color[var(--primary-color-dark)] transition-colors`

const Settings = tw.div`justify-self-end`

const SettingsButton = tw(
  HiCog,
)`h-6 w-6 cursor-pointer hover:color[var(--primary-color)] dark:hover:color[var(--primary-color-dark)] transition-colors`

const SettingsMenu = tw(
  motion.div,
)`absolute z-30 top-full right-0 bg-white dark:bg-gray-800 py-2 shadow-lg transition-colors`

const SettingsMenuItem = tw.div`flex justify-between items-center py-2 px-8 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer select-none transition-colors`

const SettingsMenuText = tw.p`mr-6`
