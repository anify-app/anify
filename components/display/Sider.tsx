import tw, { styled } from 'twin.macro'
import { Link } from 'elements'
import { useRouter } from 'next/router'
import { HiHome, HiMoon } from 'react-icons/hi'
import Logo from './Logo'

const Sider = () => {
  const router = useRouter()

  return (
    <Container>
      <Logo />

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
    </Container>
  )
}

export default Sider

const Container = tw.div`hidden lg:block h-screen p-14 py-10 pr-0 w-80 border-r border-gray-200`

const Navigation = tw.nav`mt-8 grid gap-5`

const NavigationLink = styled(Link)<{ active: boolean }>`
  ${tw`flex items-center text-lg border-r-8 border-green-500 border-opacity-0 hover:text-gray-900`}
  ${({ active }) =>
    active ? tw`text-gray-900 border-opacity-100` : tw`text-gray-400`}
`
