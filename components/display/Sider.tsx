import tw, { styled } from 'twin.macro'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Sider = () => {
  const router = useRouter()

  return (
    <Container>
      <Logo>
        Anime<Period>.</Period>
      </Logo>

      <Navigation>
        <Link href="/" passHref>
          <NavigationLink active={router.pathname === '/'}>Home</NavigationLink>
        </Link>
        <Link href="/anime" passHref>
          <NavigationLink active={router.pathname === '/anime'}>
            Anime
          </NavigationLink>
        </Link>
      </Navigation>
    </Container>
  )
}

export default Sider

const Container = tw.div`h-screen p-14 py-10 pr-0 w-80 border-r border-gray-200`

const Logo = tw.h1`text-4xl font-bold text-gray-900`

const Navigation = tw.nav`mt-8 grid gap-5`

const NavigationLink = styled.a<{ active: boolean }>`
  ${tw`text-lg border-r-8 border-green-500 border-opacity-0 hover:text-gray-900`}
  ${({ active }) =>
    active ? tw`text-gray-900 border-opacity-100` : tw`text-gray-400`}
`

const Period = tw.span`text-green-500 font-black`
