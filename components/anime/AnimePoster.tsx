import { forwardRef, ForwardedRef } from 'react'
import tw, { styled } from 'twin.macro'
import Image from 'next/image'

type AnimePosterProps = {
  mainImage: string
  title: string
  mainImageBlurred: string
  onClick?: () => void
}

const AnimePoster = ({
  mainImage,
  title,
  mainImageBlurred,
  onClick,
}: AnimePosterProps) => {
  return (
    <AnimeImage onClick={onClick}>
      <Image
        src={mainImage}
        width={225}
        height={350}
        layout="fixed"
        alt={`${title} poster.`}
        placeholder="blur"
        blurDataURL={mainImageBlurred}
        priority
      />
    </AnimeImage>
  )
}

export default AnimePoster

const AnimeImage = styled.div`
  ${tw`rounded-lg shadow-lg dark:shadow-none overflow-hidden`}
  width: 225px;
  height: 350px;
`
