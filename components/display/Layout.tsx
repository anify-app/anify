import { useState } from 'react'
import tw from 'twin.macro'
import Head from 'next/head'
import { AnimatePresence } from 'framer-motion'
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
  const [isSideNavigationOpen, setIsSideNavigationOpen] =
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
            setIsSideNavigationOpen(!isSideNavigationOpen)
          }
        />

        <Content>
          <>
            {children}
            <AnimatePresence>
              {isSideNavigationOpen ? <SideNavigation /> : null}
            </AnimatePresence>
          </>
        </Content>
      </Container>
    </>
  )
}

export default Layout

const Container = tw.div`bg-gray-50 h-screen overflow-hidden`

const Content = tw.div`relative h-full p-14 py-10 overflow-y-auto`
