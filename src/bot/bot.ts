/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { app } from '..'
import { Discord, Spotify } from '../types'
import { Client, GatewayIntentBits } from 'discord.js'
import { config } from 'dotenv'
import { join } from 'path'

config({ path: join(__dirname, '../../.env') })

export const getDiscord = async (id: string): Promise<Discord | null> => {
  const data = client.guilds.cache
    .get(process.env.GUILD_ID!)
    ?.members.cache.get(id)

  if (!data || !data.presence) return null

  return {
    name: data.displayName,
    username: data.user.username,
    discriminator: data.user.discriminator,
    avatar: data.user.displayAvatarURL({
      extension: data.user.avatar?.startsWith('a_') ? 'gif' : 'png',
      size: 1024,
    }),
    status: data.presence.status,
  }
}

export const getSpotify = async (id: string): Promise<Spotify | null> => {
  const data = client.guilds.cache
    .get(process.env.GUILD_ID!)
    ?.members.cache.get(id)

  if (!data || !data.presence) return null

  const spotify = data.presence.activities.find(
    (activity) => activity.name === 'Spotify'
  )

  if (!spotify) return null

  return {
    title: spotify.details!,
    artist: spotify.state!,
    album: spotify.assets!.largeText!,
    albumArt: spotify.assets!.largeImage!.slice(8),
  }
}

const client = new Client({
  intents: [
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
})

client.on('ready', () => {
  app.log.info('Discord Bot Ready')
})

client.login(process.env.BOT_TOKEN!)
