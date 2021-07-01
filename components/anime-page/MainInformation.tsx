import React, { useState, useEffect } from 'react'
import tw, { styled } from 'twin.macro'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { isPresent } from 'utils'
import { Skeleton } from '@chakra-ui/react'
import _ from 'lodash'
import { TypeBadge, StatusBadge, GenreTag } from 'components/anime'

type MainInformationProps = {
  isLoaded: boolean
  anime?: Anime | null
}

const MainInformation = ({ isLoaded, anime }: MainInformationProps) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState<boolean>(false)

  return (
    <Container>
      <MainImageSkeleton
        isLoaded={isLoaded}
        opacity={1}
        width={225}
        height={350}
      >
        {anime?.mainImage && anime?.mainImageBlurred ? (
          <Image
            src={anime.mainImage}
            width={225}
            height={350}
            layout="fixed"
            alt={`${anime?.title} poster.`}
            placeholder="blur"
            blurDataURL={anime.mainImageBlurred}
            priority
          />
        ) : null}
      </MainImageSkeleton>

      <TitleDescriptionContainer>
        <TitleSkeleton isLoaded={isLoaded}>
          <Title>{anime?.title}</Title>
          &nbsp;&nbsp;
          <Genres>
            {anime?.type ? <TypeBadge type={anime.type} /> : null}
            &nbsp;
            {anime?.status ? <StatusBadge status={anime.status} /> : null}
          </Genres>
        </TitleSkeleton>

        <GenreSkeleton isLoaded={isLoaded}>
          {anime?.genres
            ? anime.genres
                .filter(isPresent)
                .map((genre, index) => (
                  <GenreTag key={`genre-${index}`}>{genre}</GenreTag>
                ))
            : null}
        </GenreSkeleton>

        <DescriptionSkeleton isLoaded={isLoaded}>
          <p>
            {(anime?.description
              ? _.truncate(anime.description, {
                  length: isDescriptionExpanded ? Infinity : 500,
                  // split the description into an array of paragraphs
                }).split('\n')
              : ['']
            )
              // use line breaks between paragraphs
              .map((text, index) => (
                <React.Fragment key={`description-${index}`}>
                  {text}
                  <br />
                </React.Fragment>
              ))}
          </p>
        </DescriptionSkeleton>

        {!isDescriptionExpanded && isLoaded ? (
          <ExpandControls
            initial={{ opacity: 0 }}
            whileHover={{ opacity: isDescriptionExpanded ? 0 : 1 }}
            transition={{ duration: 0.1 }}
          >
            <ExpandText onClick={() => setIsDescriptionExpanded(true)}>
              Read More
            </ExpandText>
          </ExpandControls>
        ) : null}
      </TitleDescriptionContainer>
    </Container>
  )
}

export default MainInformation

const Container = tw.div`flex items-center md:items-start flex-col md:flex-row`

const MainImageSkeleton = tw(
  Skeleton,
)`flex-shrink-0 -mt-80! md:-mt-36! mr-0! md:mr-14! z-10`

const TitleDescriptionContainer = tw.div`relative mt-3 md:mt-0 w-full`

const TitleSkeleton = styled(Skeleton)`
  ${tw`md:flex-row mb-3 leading-4 text-center md:text-left`}
  ${({ isLoaded }) => (isLoaded ? tw`h-auto` : tw`h-8`)}
`

const Title = tw.h1`inline text-4xl md:text-3xl font-semibold align-middle`

const Genres = tw.span`align-middle`

const GenreSkeleton = styled(Skeleton)`
  ${tw`mt-3 mb-2 md:mt-0 text-center md:text-left`}
  ${({ isLoaded }) => (isLoaded ? tw`h-auto` : tw`h-6`)}
`

const DescriptionSkeleton = styled(Skeleton)<{ isLoaded: boolean }>`
  ${tw`text-gray-700 dark:text-gray-300`}
  ${({ isLoaded }) => (isLoaded ? tw`h-auto` : tw`h-28`)}
`

const ExpandControls = tw(
  motion.div,
)`absolute flex justify-center items-end bottom-0 left-0 w-full`

const ExpandText = tw.p`font-bold text-gray-600 dark:text-gray-300 bg-gradient-to-t from-gray-50 dark:from-gray-900 h-32 md:h-16 p-2 w-full text-center flex items-end justify-center cursor-pointer`
