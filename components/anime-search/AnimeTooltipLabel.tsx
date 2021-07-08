import tw from 'twin.macro'
import { TypeBadge, StatusBadge, GenreTag } from 'components/anime'
import { isPresent } from 'utils'
import { HiStar } from 'react-icons/hi'

type AnimeTooltipLabelProps = {
  anime: Anime
}

const AnimeTooltipLabel = ({ anime }: AnimeTooltipLabelProps) => {
  return (
    <Container>
      <Title>{anime.title}</Title>
      {anime.type ? <TypeBadge type={anime.type} /> : null}
      &nbsp;
      {anime.status ? <StatusBadge status={anime.status} /> : null}
      <Genres>
        {anime?.genres
          ? anime.genres.filter(isPresent).map((genre, index) => (
              <GenreTag key={`genre-${index}`} variant="solid" size="sm">
                {genre}
              </GenreTag>
            ))
          : null}
      </Genres>
      <Score>
        <ScoreIcon />
        <p>
          {anime.score || '-'}
          <ScoreTotal>/10</ScoreTotal>
        </p>
      </Score>
    </Container>
  )
}

export default AnimeTooltipLabel

const Container = tw.div`py-2 px-1`

const Title = tw.h2`text-lg leading-5 mb-0.5`

const Genres = tw.div`leading-6 mt-1.5`

const Score = tw.div`flex items-center`

const ScoreIcon = tw(HiStar)`mr-0.5 h-4 w-4`

const ScoreTotal = tw.span`text-xs opacity-50`
