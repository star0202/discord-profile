import { getDiscord, getSpotify } from './bot'
import { cache, getCache, isCached } from './cache'
import { discordCard, spotifyCard } from './cards'
import fastify from 'fastify'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss.l mm/dd/yyyy (Z)',
        ignore: 'pid,hostname',
      },
    },
  },
})

app.get('/', async (_, reply) => {
  reply.redirect('https://github.com/star0202/discord-profile')
})

app.get('/favicon.ico', async (_, reply) => {
  reply
    .code(200)
    .type('image/x-icon')
    .send(await readFile(join(__dirname, '../assets/favicon.ico')))
})

app.get('/spotify/:id', async (request, reply) => {
  if (!request.params) return reply.code(400).send('No User ID Provided')

  const { id } = request.params as { id: string }
  const data = await getSpotify(id)

  if (!data) return reply.code(400).send('User Not Found')

  let card
  if (await isCached(data)) {
    card = await getCache(data)
  } else {
    card = await spotifyCard(data)
    await cache(data, card)
  }

  reply
    .code(200)
    .type('image/svg+xml')
    .header('Cache-Control', 'public, max-age=0, must-revalidate')
    .send(card)
})

app.get('/discord/:id', async (request, reply) => {
  if (!request.params) return reply.code(400).send('No User ID Provided')

  const { id } = request.params as { id: string }
  const data = await getDiscord(id)

  if (!data) return reply.code(400).send('User Not Found')

  let card
  if (await isCached(data)) {
    card = await getCache(data)
  } else {
    card = await discordCard(data)
    await cache(data, card)
  }

  reply
    .code(200)
    .type('image/svg+xml')
    .header('Cache-Control', 'public, max-age=0, must-revalidate')
    .send(card)
})

app.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) throw err
})
