import { useState } from 'react'
import tw, { styled } from 'twin.macro'
import Logo from './Logo'
import { HiMenu, HiX, HiHome, HiMoon } from 'react-icons/hi'
import { useRouter } from 'next/router'
import { Link } from 'elements'

const MobileHeader = () => {
  const router = useRouter()
  const [isNavigationModalOpen, setIsNavigationModalOpen] =
    useState<boolean>(false)

  return (
    <>
      <Container>
        <Logo size="small" />

        <NavigationButtonContainer
          onClick={() => setIsNavigationModalOpen(true)}
        >
          <NavigationButton />
        </NavigationButtonContainer>
      </Container>
      <NavigationModalContainer isVisible={isNavigationModalOpen}>
        <NavigationModalCard>
          <HeaderRow>
            <SectionHeader>NAVIGATION</SectionHeader>
            <CloseButton onClick={() => setIsNavigationModalOpen(false)}>
              <CloseIcon />
            </CloseButton>
          </HeaderRow>
          <Navigation>
            <NavigationLink href="/" active={router.pathname === '/'}>
              <HiHome />
              &nbsp;&nbsp;Home
            </NavigationLink>
            <NavigationLink href="/anime" active={router.pathname === '/anime'}>
              <HiMoon />
              &nbsp;&nbsp;Anime
            </NavigationLink>
          </Navigation>
        </NavigationModalCard>
      </NavigationModalContainer>
    </>
  )
}

export default MobileHeader

const Container = tw.div`flex lg:hidden p-4 border-b border-gray-200 items-center justify-between`

const NavigationButtonContainer = tw.div`px-4 py-1.5 cursor-pointer  bg-green-500 hover:bg-gray-900 text-white transition-all rounded-2xl`

const NavigationButton = tw(HiMenu)`text-xl`

const NavigationModalCard = tw.div`relative bg-white rounded-lg p-5 shadow-2xl`

const HeaderRow = tw.div`flex justify-between items-center`

const CloseButton = tw.button``

const CloseIcon = tw(HiX)`text-xl text-gray-500`

const SectionHeader = tw.h2`text-gray-500 font-semibold`

const Navigation = tw.nav`mt-4 grid gap-3`

const NavigationLink = styled(Link)<{ active: boolean }>`
  ${tw`flex items-center font-semibold`}
  ${({ active }) => (active ? tw`text-green-500` : tw`text-gray-900`)}
`

const NavigationModalContainer = styled.div<{
  isVisible: boolean
}>`
  ${({ isVisible }) => [
    tw`w-full p-3`,
    isVisible ? tw`absolute lg:hidden` : tw`hidden`,
  ]}
`
