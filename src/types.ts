export type User = {
  discord: Discord
  spotify: Spotify | null
}

export type Discord = {
  name: string
  username: string
  discriminator: string
  avatar: string
  status: Status
}

export type Spotify = {
  title: string
  artist: string
  album: string
  albumArt: string
}

export type Status = 'online' | 'idle' | 'dnd' | 'offline'
