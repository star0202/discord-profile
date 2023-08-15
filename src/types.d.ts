type Discord = {
  name: string
  username: string
  discriminator: string
  avatar: string
  status: Status | 'invisible'
}

type Spotify = {
  title: string
  artist: string
  album?: string
  albumArtURL: string
}

type Status = 'online' | 'idle' | 'dnd' | 'offline'

type Env = {
  BOT_TOKEN: string
  GUILD_ID: string
}

type Lanyard = {
  data?: LanyardData

  success: Success
}

type LanyardData = {
  spotify: {
    track_id: string
    timestamps: Timestamps
    album: string
    album_art_url: string
    artist: string
    song: string
  } | null

  discord_user: {
    id: string
    username: string
    avatar: string
    discriminator: string
    bot: boolean
    global_name: string
    avatar_decoration: string | null
    display_name: string
    public_flags: number
  }

  activities: {
    flags: number
    id: string
    name: string
    type: number
    state: string
    session_id: string
    details: string
    timestamps: Timestamps
    assets: {
      large_image: string
      large_text: string
    }
    sync_id: string
    created_at: number
    party: {
      id: string
    }
  }[]

  discord_status: Status
  active_on_discord_web: boolean
  active_on_discord_desktop: boolean
  active_on_discord_mobile: boolean
  listening_to_spotify: boolean
}

type Timestamps = {
  start: number
  end: number
}
