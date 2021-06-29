import tw, { styled } from 'twin.macro'

type LogoProps = {
  size?: 'large' | 'medium' | 'small'
}

const Logo = ({ size = 'large' }: LogoProps) => {
  return (
    <Text size={size}>
      anime<Period>.</Period>
    </Text>
  )
}

export default Logo

const Text = styled.h1<{
  size: LogoProps['size']
}>`
  ${({ size }) => [
    tw`inline font-bold text-gray-900 dark:text-gray-50 select-none transition-colors`,
    size === 'large' && tw`text-4xl`,
    size === 'medium' && tw`text-3xl`,
    size === 'small' && tw`text-2xl`,
  ]}
`

const Period = tw.span`text-emerald-500 font-black`
