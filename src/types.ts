export type Lanyard = {
  data: {
    spotify: Spotify | null

    discord_user: User

    activities: Activity[]

    discord_status: 'idle' | 'dnd' | 'online' | 'offline'
    active_on_discord_web: boolean
    active_on_discord_desktop: boolean
    active_on_discord_mobile: boolean
    listening_to_spotify: boolean
  }

  success: boolean
}

type Spotify = {
  track_id: string
  timestamps: Timestamps
  album: string
  album_art_url: string
  artist: string
  song: string
}

type User = {
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

type Activity = {
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
}

type Timestamps = {
  start: number
  end: number
}
