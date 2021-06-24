import { useState } from 'react'
import tw from 'twin.macro'
import Head from 'next/head'
import Header from './Header'
import SideNavigation from './SideNavigation'

type LayoutProps = {
  children: React.ReactNode
  title?: string
  description?: string
}

const Layout = ({
  children,
  title = 'Anime Next App',
  description = '',
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
          <Content>{children}</Content>
        </ContentContainer>
      </Container>
    </>
  )
}

export default Layout

const Container = tw.div`h-screen overflow-hidden`

const ContentContainer = tw.div`relative flex h-full`

const Content = tw.div`relative h-full px-6 md:px-14 py-8 md:py-10 overflow-y-auto flex-grow bg-gray-50 dark:bg-gray-900 transition-colors`
