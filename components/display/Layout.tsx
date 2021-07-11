import { useState } from 'react'
import tw, { styled } from 'twin.macro'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { useColorMode } from '@chakra-ui/react'
import Header from './Header'
import SideNavigation from './SideNavigation'
import SEO, { SEOProps } from './SEO'

type LayoutProps = {
  children: React.ReactNode
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
  const { colorMode } = useColorMode()
  const [isSideNavigationExpanded, setIsSideNavigationExpanded] =
    useState<boolean>(false)

  return (
    <>
      <SEO {...seo} />

      <Container>
        <Header
          onHamburgerClick={() =>
            setIsSideNavigationExpanded(!isSideNavigationExpanded)
          }
        />

        <ContentContainer>
          <SideNavigation
            isExpanded={isSideNavigationExpanded}
            onClose={() => setIsSideNavigationExpanded(false)}
            shouldFullyCollapse={shouldFullyCollapse}
            currentPath={seo.url}
          />
          <Content
            className={
              colorMode === 'dark' ? 'os-theme-light' : 'os-theme-dark'
            }
            $noPadding={noPadding}
            options={{ scrollbars: { autoHide: 'scroll' } }}
          >
            {children}
          </Content>
        </ContentContainer>
      </Container>
    </>
  )
}

export default Layout

const Container = tw.div`flex flex-col h-screen overflow-hidden`

const ContentContainer = tw.div`relative flex flex-grow`

const Content = styled(OverlayScrollbarsComponent)<{ $noPadding: boolean }>`
  ${({ $noPadding }) => [
    tw`relative h-full flex-grow bg-gray-50 dark:bg-gray-900 transition-colors overflow-hidden w-screen`,
    !$noPadding && tw`px-6 md:px-14 py-8 md:py-10`,
  ]}
`
