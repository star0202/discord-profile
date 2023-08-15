import axios, { AxiosInstance } from 'axios'
import type { FastifyBaseLogger } from 'fastify'

export default class LanyardRequest {
  private rest: AxiosInstance

  private logger: FastifyBaseLogger

  constructor(logger: FastifyBaseLogger) {
    this.rest = axios.create({
      baseURL: 'https://api.lanyard.rest/v1',
    })

    this.logger = logger.child({ name: 'Lanyard' })
  }

  async getUser(id: string) {
    const { data } = await this.rest.get<Lanyard>(`/users/${id}`)
    this.logger.info(`Get user ${id} - ${data.success ? 'Found' : 'Not Found'}`)

    if (!data.success) return undefined

    return data.data as LanyardData
  }

  async getDiscord(id: string): Promise<Discord | undefined> {
    const data = await this.getUser(id)

    if (!data) return undefined

    return {
      name: data.discord_user.username,
      username: data.discord_user.username,
      discriminator: data.discord_user.discriminator,
      avatar: `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${
        data.discord_user.avatar
      }.${data.discord_user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=1024`,
      status: data.discord_status,
    }
  }

  async getSpotify(
    id: string,
    album: boolean
  ): Promise<Spotify | null | undefined> {
    const data = await this.getUser(id)

    if (!data) return undefined

    if (!data.spotify) return null

    return {
      title: data.spotify.song,
      artist: data.spotify.artist,
      album: album ? data.spotify.album : undefined,
      albumArtURL: data.spotify.album_art_url,
    }
  }

  async getSpotifyTrackURL(id: string) {
    const data = await this.getUser(id)

    if (!data) return undefined

    if (!data.spotify) return null

    return `https://open.spotify.com/track/${data.spotify.track_id}`
  }
}
