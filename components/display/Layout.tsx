import { useState } from 'react'
import tw, { styled } from 'twin.macro'
import Head from 'next/head'
import Header from './Header'
import SideNavigation from './SideNavigation'

type LayoutProps = {
  children: React.ReactNode
  title?: string
  description?: string
  noPadding?: boolean
}

const Layout = ({
  children,
  title = 'Anime Next App',
  description = '',
  noPadding = false,
}: LayoutProps) => {
  const [isSideNavigationExpanded, setIsSideNavigationExpanded] =
    useState<boolean>(false)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />

        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
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
          />
          <Content noPadding={noPadding}>{children}</Content>
        </ContentContainer>
      </Container>
    </>
  )
}

export default Layout

const Container = tw.div`h-screen overflow-hidden`

const ContentContainer = tw.div`relative flex h-full`

const Content = styled.div<{ noPadding: boolean }>`
  ${({ noPadding }) => [
    tw`relative h-full  overflow-y-auto flex-grow bg-gray-50 dark:bg-gray-900 transition-colors`,
    !noPadding && tw`px-6 md:px-14 py-8 md:py-10`,
  ]}
`
