import { forwardRef, ForwardedRef } from 'react'
import tw, { styled } from 'twin.macro'
import Image from 'next/image'

type AnimePosterProps = {
  mainImage: string
  title: string
  mainImageBlurred: string
  onClick?: () => void
}

const WrappedAnimePoster = forwardRef(function AnimePoster(
  { mainImage, title, mainImageBlurred, onClick }: AnimePosterProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <AnimeImage onClick={onClick} ref={ref}>
      <Image
        src={mainImage}
        width={225}
        height={350}
        layout="fixed"
        alt={`${title} poster.`}
        placeholder="blur"
        blurDataURL={mainImageBlurred}
        unoptimized
      />
    </AnimeImage>
  )
})

export default WrappedAnimePoster

const AnimeImage = styled.div`
  ${tw`rounded-lg shadow-lg dark:shadow-none overflow-hidden`}
  width: 225px;
  height: 350px;
`
