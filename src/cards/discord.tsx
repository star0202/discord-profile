import { generate } from '.'

const statusMapping = {
  online: { color: '#0ac459', text: 'Online' },
  idle: { color: '#f0b232', text: 'Idle' },
  dnd: { color: '#f23f43', text: 'Do Not Disturb' },
  offline: { color: '#5d5f63', text: 'Offline' },
} satisfies Record<Status, { color: string; text: string }>

export const discordCard = async (discordData: Discord) => {
  const data = {
    name: discordData.name,
    username:
      discordData.discriminator === '0'
        ? '@' + discordData.username
        : `${discordData.username}#${discordData.discriminator}`,
    status: discordData.status === 'invisible' ? 'offline' : discordData.status,
    pfp: discordData.avatar,
  }

  const pfpMargin = 10
  const textMargin = 15

  return await generate(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#5865f2',
        borderRadius: 10,
      }}
    >
      <img
        src={data.pfp}
        style={{
          width: 100 - pfpMargin * 2,
          height: 100 - pfpMargin * 2,
          margin: pfpMargin,
          borderRadius: 10,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: textMargin - pfpMargin,
          marginRight: textMargin,
          color: 'white',
        }}
      >
        <img
          src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0b544a3e3c7c05753bcd_full_logo_white_RGB.png"
          style={{ height: 20, marginBottom: 5 }}
        />
        {data.name}
        <div style={{ display: 'flex', opacity: 0.8 }}>
          {data.username} -
          <div
            style={{
              color: statusMapping[data.status].color,
              marginLeft: 4,
            }}
          >
            {statusMapping[data.status].text}
          </div>
        </div>
      </div>
    </div>
  )
}
