import { generate } from '.'

export const spotifyCard = async (spotifyData: Spotify | null) => {
  const data = spotifyData ?? {
    title: 'Not Playing',
    artist: 'star0202/discord-profile',
    album: 'Spotify',
    albumArtURL:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Emoji_u1f634.svg/1200px-Emoji_u1f634.svg.png',
  }

  const albumMargin = 10
  const textMargin = 15

  return await generate(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#1ed760',
        borderRadius: 10,
      }}
    >
      <img
        src={data.albumArtURL}
        style={{
          width: 100 - albumMargin * 2,
          height: 100 - albumMargin * 2,
          margin: albumMargin,
          borderRadius: 10,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: textMargin - albumMargin,
          marginRight: textMargin,
        }}
      >
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
          style={{ height: 20, marginBottom: 5 }}
        />
        <div>{data.title}</div>
        <div style={{ display: 'flex', color: '#3d3d3d' }}>
          {data.artist} - {data.album}
        </div>
      </div>
    </div>
  )
}
