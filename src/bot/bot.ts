/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { app } from '..'
import { User } from '../types'
import { config } from './config'
import { Client, GatewayIntentBits } from 'discord.js'

export const getUser = async (id: string) => {
  const data = await client.guilds.cache.get(config.guild)?.members.fetch(id)

  if (!data || !data.presence) return null

  const spotify = data.presence.activities.find(
    (activity) => activity.name === 'Spotify'
  )

  const user: User = {
    discord: {
      name: data.displayName,
      username: data.user.username,
      discriminator: data.user.discriminator,
      avatar: data.user.displayAvatarURL({
        extension: data.user.avatar?.startsWith('a_') ? 'gif' : 'png',
        size: 1024,
      }),
      status:
        data.presence.status === 'invisible' ? 'offline' : data.presence.status,
    },
    spotify: spotify
      ? {
          title: spotify.details!,
          artist: spotify.state!,
          album: spotify.assets!.largeText!,
          albumArt:
            'https://i.scdn.co/image/' + spotify.assets!.largeImage!.slice(8),
        }
      : null,
  }

  return user
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

client.login(config.token)
