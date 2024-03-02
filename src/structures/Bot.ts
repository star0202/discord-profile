import { Client, GatewayIntentBits } from 'discord.js'
import { config } from 'dotenv'
import type { FastifyBaseLogger } from 'fastify'
import { join } from 'path'

config({ path: join(__dirname, '../../.env') })
const env = process.env as Env

export default class Bot extends Client {
  private logger: FastifyBaseLogger

  constructor(logger: FastifyBaseLogger) {
    super({
      intents: [
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
      ],
    })

    this.logger = logger.child({ name: 'Bot' })

    this.once('ready', () => {
      this.logger.info('Discord Bot Ready')
    })

    this.on('debug', (m) => this.logger.debug(m))
  }

  async start() {
    await this.login(env.BOT_TOKEN)
  }

  getUser(id: string) {
    const data = this.guilds.cache.get(env.GUILD_ID)?.members.cache.get(id)
    this.logger.info(`Get user ${id} - ${data ? 'Found' : 'Not Found'}`)

    return data
  }

  async getDiscord(id: string): Promise<Discord | undefined> {
    const data = this.getUser(id)

    if (!data) return undefined

    return {
      name: data.user.globalName ?? data.user.username,
      username: data.user.username,
      discriminator: data.user.discriminator,
      avatar: data.user.displayAvatarURL({
        extension: data.user.avatar?.startsWith('a_') ? 'gif' : 'png',
        size: 1024,
      }),
      status: data.presence?.status ?? 'offline',
    }
  }

  async getSpotify(
    id: string,
    album: boolean,
  ): Promise<Spotify | null | undefined> {
    const data = this.getUser(id)

    if (!data) return undefined

    if (!data.presence) return null

    const spotify = data.presence.activities.find(
      (activity) => activity.name === 'Spotify',
    )

    if (
      !(
        spotify &&
        spotify.assets &&
        spotify.assets.largeImage &&
        spotify.assets.largeText &&
        spotify.details &&
        spotify.state
      )
    )
      return null

    return {
      title: spotify.details,
      artist: spotify.state,
      album: album ? spotify.assets.largeText : undefined,
      albumArtURL: `https://i.scdn.co/image/${spotify.assets.largeImage.slice(
        8,
      )}`,
    }
  }
}
