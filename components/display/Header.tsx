import tw from 'twin.macro'
import Logo from './Logo'
import { HiMenu } from 'react-icons/hi'

type HeaderTypes = {
  onHamburgerClick: () => void
}

const Header = ({ onHamburgerClick }: HeaderTypes) => {
  return (
    <>
      <Container>
        <HamburgerButton onClick={onHamburgerClick} />

        <LogoContainer>
          <Logo size="medium" />
        </LogoContainer>

        <div />
      </Container>
    </>
  )
}

export default Header

const Container = tw.div`bg-white grid grid-cols-3 md:flex py-4 px-6 items-center `

const HamburgerButton = tw(
  HiMenu,
)`text-2xl mr-6 cursor-pointer hover:text-green-500`

const LogoContainer = tw.div`text-center`
