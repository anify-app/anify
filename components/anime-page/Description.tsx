import React, { useState } from 'react'
import { Skeleton } from '@chakra-ui/react'
import tw, { styled } from 'twin.macro'
import _ from 'lodash'
import { motion } from 'framer-motion'

type DescriptionProps = {
  isLoaded: boolean
  anime?: Anime | null
}

const Description = ({ isLoaded, anime }: DescriptionProps) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState<boolean>(false)

  return (
    <>
      <DescriptionSkeleton isLoaded={isLoaded} animation={false}>
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
    </>
  )
}

export default Description

const DescriptionSkeleton = styled(Skeleton)<{ isLoaded: boolean }>`
  ${tw`text-gray-700 dark:text-gray-300`}
  ${({ isLoaded }) => (isLoaded ? tw`h-auto` : tw`h-28`)}
`

const ExpandControls = tw(
  motion.div,
)`absolute flex justify-center items-end bottom-0 left-0 w-full`

const ExpandText = tw.p`font-bold text-gray-600 dark:text-gray-300 bg-gradient-to-t from-gray-50 dark:from-gray-900 h-32 md:h-16 p-2 w-full text-center flex items-end justify-center cursor-pointer`
