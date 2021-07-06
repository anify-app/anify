import { DataSource } from 'apollo-datasource'
import client, { SearchIndex } from 'algoliasearch'

export class Agolia extends DataSource {
  index: SearchIndex
  constructor() {
    super()
    if (
      !process.env.SEARCH_APP_ID ||
      !process.env.SEARCH_INDEX ||
      !process.env.SEARCH_API_KEY
    )
      throw new Error('SEARCH | missing initial parameters')
    this.index = client(
      process.env.SEARCH_APP_ID,
      process.env.SEARCH_API_KEY,
    ).initIndex(process.env.SEARCH_INDEX)
  }

  async searchAnime({
    query,
    page,
    hitsPerPage,
    offset,
    length,
  }: QuerySearchAnimeArgs) {
    const results = await this.index.search(query, {
      hitsPerPage: hitsPerPage || undefined,
      page: page || undefined,
      offset: offset || undefined,
      length: length || undefined,
    })

    return {
      hits: results.hits,
      page: results.page,
      nbPages: results.nbPages,
      nbHits: results.nbHits,
      hitsPerPage: results.hitsPerPage,
      message: results.message,
    }
  }
}
