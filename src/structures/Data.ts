import Bot from './Bot'
import LanyardRequest from './Lanyard'
import type { FastifyBaseLogger } from 'fastify'

export default class DataManager {
  private bot: Bot
  private lanyard: LanyardRequest

  private logger: FastifyBaseLogger

  constructor(logger: FastifyBaseLogger) {
    this.bot = new Bot(logger)
    this.lanyard = new LanyardRequest(logger)

    this.logger = logger.child({ name: 'Data' })

    this.bot.start().then()
  }

  async discord(id: string) {
    this.logger.info(`Discord - ${id}`)
    return Promise.race([this.bot.getDiscord(id), this.lanyard.getDiscord(id)])
  }

  async spotify(id: string, redirect: true): Promise<string | null | undefined>
  async spotify(
    id: string,
    redirect: false
  ): Promise<Spotify | null | undefined>
  async spotify(id: string, redirect: boolean) {
    this.logger.info(
      `Spotify - ${id} (${redirect ? 'Redirect' : 'Not Redirect'})`
    )

    if (redirect) return this.lanyard.getSpotifyTrackURL(id)

    return Promise.race([this.bot.getSpotify(id), this.lanyard.getSpotify(id)])
  }
}
