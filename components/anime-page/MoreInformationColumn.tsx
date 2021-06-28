import React from 'react'
import { format } from 'date-fns'
import tw, { styled } from 'twin.macro'
import { Tag, Skeleton } from '@chakra-ui/react'
import SeasonTag from './SeasonTag'

type MoreInformationColumnProps = {
  isLoaded: boolean
  anime?: Anime | null
}

const MoreInformationColumn = ({
  isLoaded,
  anime,
}: MoreInformationColumnProps) => {
  return (
    <Container>
      <LoadingSkeleton isLoaded={isLoaded}>
        {anime?.airedStart ? (
          <Label>
            <Field>Aired</Field>
            <Value>
              {format(new Date(anime.airedStart), 'PPP')}
              {anime.type !== 'movie'
                ? ` to ${
                    anime.airedEnd
                      ? format(new Date(anime.airedEnd), 'PPP')
                      : '-'
                  }`
                : null}
            </Value>
          </Label>
        ) : null}
        {anime?.season && anime?.airedStart ? (
          <Label>
            <Field>Premiered</Field>
            <TagList>
              <SeasonTag>
                {`${anime.season} ${format(new Date(anime.airedStart), 'yyy')}`}
              </SeasonTag>
            </TagList>
          </Label>
        ) : null}
        {anime?.episodes && anime?.type !== 'movie' ? (
          <Label>
            <Field>Episodes</Field>
            <Value>{anime.episodes}</Value>
          </Label>
        ) : null}
        {anime?.duration ? (
          <Label>
            <Field>Duration</Field>
            <Value>{anime.duration}</Value>
          </Label>
        ) : null}
        {anime?.sourceMaterialType ? (
          <Label>
            <Field>Source Material</Field>
            <Value>{anime.sourceMaterialType}</Value>
          </Label>
        ) : null}
        {anime?.licensors?.length ? (
          <Label>
            <Field>Licensors</Field>
            <TagList>
              {anime.licensors.map((licensor, index) => (
                <React.Fragment key={`licensor-${index}`}>
                  <Tag size="sm">{licensor}</Tag>
                  &nbsp;
                </React.Fragment>
              ))}
            </TagList>
          </Label>
        ) : null}
        {anime?.producers?.length ? (
          <Label>
            <Field>Producers</Field>
            <TagList>
              {anime.producers.map((producer, index) => (
                <React.Fragment key={`producer-${index}`}>
                  <Tag size="sm">{producer}</Tag>
                  &nbsp;
                </React.Fragment>
              ))}
            </TagList>
          </Label>
        ) : null}
        {anime?.studios?.length ? (
          <Label>
            <Field>Studios</Field>
            <TagList>
              {anime.studios.map((studio, index) => (
                <React.Fragment key={`studio-${index}`}>
                  <Tag size="sm">{studio}</Tag>
                  &nbsp;
                </React.Fragment>
              ))}
            </TagList>
          </Label>
        ) : null}
      </LoadingSkeleton>

      <Placeholder />
    </Container>
  )
}

export default MoreInformationColumn

const Container = tw.div`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mt-8`

const LoadingSkeleton = styled(Skeleton)<{ isLoaded: boolean }>`
  ${tw`bg-white dark:bg-gray-800 px-4 pt-4 pb-1 rounded`}
  ${({ isLoaded }) => (isLoaded ? tw`h-auto` : `height: 418px;`)}
`

const Placeholder = tw.div`col-span-1 md:col-span-3 xl:col-span-2`

const Label = tw.div`leading-5 mb-3`

const Field = tw.p`font-bold text-sm`

const Value = tw.span`text-gray-500 dark:text-gray-400 text-sm`

const TagList = tw.div`mt-1 -mb-1 leading-7`
