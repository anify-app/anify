import tw from 'twin.macro'
import { TypeBadge, StatusBadge, GenreTag } from 'components/anime'
import { isPresent } from 'utils'

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
    </Container>
  )
}

export default AnimeTooltipLabel

const Container = tw.div`py-2 px-1`

const Title = tw.h2`text-lg leading-5 mb-0.5`

const Genres = tw.div`leading-6 mt-1.5`
