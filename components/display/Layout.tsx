import { useState } from 'react'
import tw, { styled } from 'twin.macro'
import Head from 'next/head'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { useColorMode } from '@chakra-ui/react'
import Header from './Header'
import SideNavigation from './SideNavigation'

type LayoutProps = {
  children: React.ReactNode
  title?: string
  description?: string
  noPadding?: boolean
  shouldFullyCollapse?: boolean
}

const Layout = ({
  children,
  title = 'Anime Next App',
  description = '',
  noPadding = false,
  shouldFullyCollapse = false,
}: LayoutProps) => {
  const { colorMode } = useColorMode()
  const [isSideNavigationExpanded, setIsSideNavigationExpanded] =
    useState<boolean>(false)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
          />
          <Content
            className={
              colorMode === 'dark' ? 'os-theme-light' : 'os-theme-dark'
            }
            noPadding={noPadding}
            options={{ scrollbars: { autoHide: 'scroll' } }}
          >
            {children}
          </Content>{' '}
        </ContentContainer>
      </Container>
    </>
  )
}

export default Layout

const Container = tw.div`flex flex-col h-screen overflow-hidden`

const ContentContainer = tw.div`relative flex flex-grow`

const Content = styled(OverlayScrollbarsComponent)<{ noPadding: boolean }>`
  ${({ noPadding }) => [
    tw`relative h-full flex-grow bg-gray-50 dark:bg-gray-900 transition-colors`,
    !noPadding && tw`px-6 md:px-14 py-8 md:py-10`,
  ]}
`
