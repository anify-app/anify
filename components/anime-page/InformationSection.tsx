import React from 'react'
import { format } from 'date-fns'
import tw, { styled } from 'twin.macro'
import { Tag, Skeleton } from '@chakra-ui/react'
import { HiStar } from 'react-icons/hi'
import { isPresent } from 'utils'
import SeasonTag from './SeasonTag'
import StatisticCard from './StatisticCard'

type InformationSectionProps = {
  isLoaded: boolean
  anime?: Anime | null
}

const InformationSection = ({ isLoaded, anime }: InformationSectionProps) => {
  return (
    <Container>
      <MoreInformationColumn isLoaded={isLoaded}>
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
                <SpacedTag key={`licensor-${index}`} size="sm">
                  {licensor}
                </SpacedTag>
              ))}
            </TagList>
          </Label>
        ) : null}
        {anime?.producers?.length ? (
          <Label>
            <Field>Producers</Field>
            <TagList>
              {anime.producers.map((producer, index) => (
                <SpacedTag key={`producer-${index}`} size="sm">
                  {producer}
                </SpacedTag>
              ))}
            </TagList>
          </Label>
        ) : null}
        {anime?.studios?.length ? (
          <Label>
            <Field>Studios</Field>
            <TagList>
              {anime.studios.map((studio, index) => (
                <SpacedTag key={`studio-${index}`} size="sm">
                  {studio}
                </SpacedTag>
              ))}
            </TagList>
          </Label>
        ) : null}

        {anime?.sources ? (
          <Label>
            <Field>References</Field>
            {anime.sources.filter(isPresent).map((source) => (
              <ValueLink href={source.url || undefined} key={source.name}>
                {source?.name}
              </ValueLink>
            ))}
          </Label>
        ) : null}
      </MoreInformationColumn>

      <StatisticGrid isLoaded={isLoaded}>
        {anime?.score ? (
          <StatisticCard
            icon={<ScoreIcon />}
            label="Score"
            value={
              <>
                {anime.score}
                <ScoreTotal>/10</ScoreTotal>
              </>
            }
          />
        ) : null}
      </StatisticGrid>
    </Container>
  )
}

export default InformationSection

const Container = tw.div`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mt-8 gap-6`

const MoreInformationColumn = styled(Skeleton)<{ isLoaded: boolean }>`
  ${tw`bg-white dark:bg-gray-800 px-4 pt-4 pb-1 rounded shadow-lg dark:shadow-none`}
  ${({ isLoaded }) => (isLoaded ? tw`h-auto` : `height: 418px;`)}
`

const StatisticGrid = styled(Skeleton)<{ isLoaded: boolean }>`
  ${tw`col-span-1 md:col-span-2 xl:col-span-3`}
  ${({ isLoaded }) => (isLoaded ? tw`h-auto` : `height: 80px;`)}
`

const Label = tw.div`leading-5 mb-3`

const Field = tw.p`font-bold text-sm`

const Value = tw.span`text-gray-500 dark:text-gray-400 text-sm`

const ValueLink = tw.a`text-emerald-500 hover:text-emerald-600! dark:text-emerald-400 dark:hover:text-emerald-500! text-sm`

const TagList = tw.div`mt-1 -mb-1 leading-6`

const SpacedTag = tw(Tag)`mr-0.5`

const ScoreIcon = tw(HiStar)`mr-2 w-6 h-6`

const ScoreTotal = tw.span`text-base opacity-50`
