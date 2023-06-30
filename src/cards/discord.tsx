import { generate } from '.'
import type { Status, User } from '../types'

const statusMapping = {
  online: { color: '#23a55a', text: 'Online' },
  idle: { color: '#f0b232', text: 'Idle' },
  dnd: { color: '#f23f43', text: 'Do Not Disturb' },
  offline: { color: '#5d5f63', text: 'Offline' },
} satisfies Record<Status, { color: string; text: string }>

export const discordCard = async (
  discordData: {
    discord_user: User
    discord_status: Status
  },
  marginQuery?: {
    pfpMargin?: string
    textMargin?: string
  }
) => {
  const user = discordData.discord_user
  const data = {
    global_name: user.global_name,
    username:
      user.discriminator === '0'
        ? '@' + user.username
        : `${user.username}#${user.discriminator}`,
    status: discordData.discord_status,
    pfp: user.avatar.startsWith('a_')
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=1024`
      : `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`,
  }

  const pfpMargin = marginQuery?.pfpMargin
    ? parseInt(marginQuery.pfpMargin)
    : 10
  const textMargin = marginQuery?.textMargin
    ? parseInt(marginQuery.textMargin)
    : 15

  return await generate(
    <>
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
          {data.global_name}
          <div style={{ display: 'flex', opacity: 0.6 }}>
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
    </>
  )
}
