import { getUser } from './bot'
import { discordCard, spotifyCard } from './cards'
import fastify from 'fastify'

export const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
})

app.get('/', async (_, reply) => {
  reply.redirect('https://github.com/star0202/discord-profile')
})

app.get('/spotify/:id', async (request, reply) => {
  if (!request.params) return reply.code(400).send('No User ID Provided')

  const { id } = request.params as { id: string }
  const margin = request.query as {
    albumMargin?: string
    textMargin?: string
  }
  const data = await getUser(id)

  if (!data) return reply.code(400).send('User Not Found')

  const card = await spotifyCard(data.spotify, margin)

  reply
    .code(200)
    .type('image/svg+xml')
    .header('Cache-Control', 'public, max-age=0, must-revalidate')
    .send(card)
})

app.get('/discord/:id', async (request, reply) => {
  if (!request.params) return reply.code(400).send('No User ID Provided')

  const { id } = request.params as { id: string }
  const margin = request.query as {
    pfpMargin?: string
    textMargin?: string
  }
  const data = await getUser(id)

  if (!data) return reply.code(400).send('User Not Found')

  const card = await discordCard(data.discord, margin)

  reply
    .code(200)
    .type('image/svg+xml')
    .header('Cache-Control', 'public, max-age=0, must-revalidate')
    .send(card)
})

app.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) throw err
})
