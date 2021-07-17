import React, { useState, useEffect } from 'react'
import tw, { styled } from 'twin.macro'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { useTheme } from 'next-themes'
import Div100vh from 'react-div-100vh'
import Header from './Header'
import SideNavigation from './SideNavigation'
import SEO, { SEOProps } from './SEO'

type LayoutProps = {
  children: React.ReactElement | React.ReactElement[]
  seo: SEOProps
  noPadding?: boolean
  shouldFullyCollapse?: boolean
}

const Layout = ({
  children,
  seo,
  noPadding = false,
  shouldFullyCollapse = false,
}: LayoutProps) => {
  const [isOverlayScrollbarInitialized, setIsOverlayScrollbarInitialized] =
    useState(false)
  const { resolvedTheme } = useTheme()
  const [isSideNavigationExpanded, setIsSideNavigationExpanded] =
    useState<boolean>(false)
  const [mounted, setMounted] = useState(typeof document !== 'undefined')
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false)

  useEffect(() => setMounted(true), [])

  return (
    <>
      <SEO {...seo} />

      <Container>
        <Header
          onHamburgerClick={() =>
            setIsSideNavigationExpanded(!isSideNavigationExpanded)
          }
          isSearchModalOpen={isSearchModalOpen}
          onSearchModalOpen={(val: boolean) => setIsSearchModalOpen(val)}
        />

        <ContentContainer
          $noPadding={noPadding || isOverlayScrollbarInitialized}
          $noScroll={isSearchModalOpen}
        >
          <SideNavigation
            isExpanded={isSideNavigationExpanded}
            onClose={() => setIsSideNavigationExpanded(false)}
            shouldFullyCollapse={shouldFullyCollapse}
            currentPath={seo.url}
          />

          {/* don't render any client-dependent state until actually mounted on the client */}
          {mounted ? (
            <OverlayScrollbar
              className={
                resolvedTheme === 'dark' ? 'os-theme-light' : 'os-theme-dark'
              }
              $noPadding={noPadding}
              options={{
                scrollbars: { autoHide: 'scroll' },
                nativeScrollbarsOverlaid: { initialize: false },
                callbacks: {
                  onInitialized: () => setIsOverlayScrollbarInitialized(true),
                },
              }}
            >
              {children}
            </OverlayScrollbar>
          ) : null}
        </ContentContainer>
      </Container>
    </>
  )
}

export default Layout

// Div100vh library required to have correct behavior on mobile safari
const Container = tw(Div100vh)`flex flex-col`

const ContentContainer = styled.div<{
  $noPadding: boolean
  $noScroll: boolean
}>`
  ${tw`relative flex flex-grow h-full`}
  ${({ $noPadding }) => !$noPadding && tw`px-6 md:px-14 py-8 md:py-10`}
  ${({ $noScroll }) =>
    $noScroll ? tw`overflow-y-hidden` : tw`overflow-y-auto`}
`

const OverlayScrollbar = styled(OverlayScrollbarsComponent)<{
  $noPadding: boolean
}>`
  ${({ $noPadding }) => [
    tw`relative flex-grow bg-gray-50 dark:bg-gray-900 transition-colors overflow-hidden w-screen`,
    !$noPadding && tw`px-6 md:px-14 py-8 md:py-10`,
  ]}
`
