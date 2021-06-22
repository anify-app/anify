import NextLink from 'next/link'

type LinkProps = {
  href: string
  children: React.ReactNode
  className?: string
}

const Link = ({ href, children, className }: LinkProps) => {
  return (
    <NextLink href={href} passHref>
      <a className={className}>{children}</a>
    </NextLink>
  )
}

export default Link
