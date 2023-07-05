type Discord = {
  name: string
  username: string
  discriminator: string
  avatar: string
  status: Status | 'invisible'
}

type Spotify = {
  title?: string | null
  artist?: string | null
  album?: string | null
  albumArt?: string
}

type Status = 'online' | 'idle' | 'dnd' | 'offline'
