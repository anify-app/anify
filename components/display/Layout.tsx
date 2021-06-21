import Sider from './Sider'
import tw from 'twin.macro'
import Head from 'next/head'

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
        <Sider />
        <Content>{children}</Content>
      </Container>
    </>
  )
}

export default Layout

const Container = tw.div`flex bg-gray-50`

const Content = tw.div`p-14 py-10`
