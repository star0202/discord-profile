import { Spotify } from '../types'
import { readFileSync } from 'fs'
import { join } from 'path'
import satori from 'satori'

export const genSpotifyCard = async (spotifyData: Spotify | null) => {
  const data = {
    song: spotifyData?.song ?? 'Not Playing',
    artist: spotifyData?.artist ?? 'star0202/discord-profile',
    album: spotifyData?.album ?? 'Spotify',
    album_art_url:
      spotifyData?.album_art_url ??
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Emoji_u1f634.svg/1200px-Emoji_u1f634.svg.png',
  }

  return await satori(
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#1ed760',
          borderRadius: 10,
        }}
      >
        <img
          src={data.album_art_url}
          style={{ width: 90, height: 90, borderRadius: 10, margin: 5 }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 15,
            marginRight: 20,
          }}
        >
          <div style={{ display: 'flex' }}>{data.song}</div>
          <div style={{ display: 'flex', color: '#3d3d3d' }}>
            {data.artist} - {data.album}
          </div>
        </div>
      </div>
    </>,
    {
      height: 100,
      fonts: [
        {
          name: 'Pretendard-SemiBold',
          data: readFileSync(
            join(__dirname, '../fonts/Pretendard-SemiBold.otf')
          ),
        },
        {
          name: 'PretendardJP-SemiBold',
          data: readFileSync(
            join(__dirname, '../fonts/PretendardJP-SemiBold.otf')
          ),
        },
      ],
    }
  )
}
