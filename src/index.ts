import { discordCard, spotifyCard } from './cards'
import { LanyardRequest } from './http'
import fastify from 'fastify'

const app = fastify({
  logger: true,
})

const lanyard = new LanyardRequest()

app.get('/', async (_, reply) => {
  reply.redirect('https://github.com/star0202/discord-profile')
})

app.get('/spotify/:id', async (request, reply) => {
  if (!request.params) reply.code(400).send('No User ID Provided')

  const { id } = request.params as { id: string }
  const margin = request.query as {
    albumMargin?: string
    textMargin?: string
  }
  const { data } = await lanyard.getUser(id)

  const card = await spotifyCard(data.spotify, margin)

  reply
    .code(200)
    .type('image/svg+xml')
    .header('Cache-Control', 'public, max-age=0, must-revalidate')
    .send(card)
})

app.get('/discord/:id', async (request, reply) => {
  if (!request.params) reply.code(400).send('No User ID Provided')

  const { id } = request.params as { id: string }
  const margin = request.query as {
    pfpMargin?: string
    textMargin?: string
  }
  const {
    data: { discord_user, discord_status },
  } = await lanyard.getUser(id)

  const card = await discordCard({ discord_user, discord_status }, margin)

  reply
    .code(200)
    .type('image/svg+xml')
    .header('Cache-Control', 'public, max-age=0, must-revalidate')
    .send(card)
})

app.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) throw err
})
