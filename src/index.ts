import { discordCard } from './cards/discord'
import { spotifyCard } from './cards/spotify'
import CacheManager from './structures/cache'
import DataManager from './structures/data'
import fastify from 'fastify'
import { readFile } from 'fs/promises'
import { join } from 'path'

const app = fastify({
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

export const logger = app.log

const dataManager = new DataManager(logger)
const cacheManager = new CacheManager(logger)

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
  const { redirect } = request.query as { redirect: string }

  let data
  if (redirect === 'true') {
    data = await dataManager.spotify(id, true)

    if (data === undefined) return reply.code(400).send('User Not Found')

    reply.redirect(data ?? 'https://github.com/star0202/discord-profile')
  } else {
    data = await dataManager.spotify(id, false)

    if (data === undefined) return reply.code(400).send('User Not Found')

    const card = await cacheManager.generateCachedCard(data, spotifyCard)

    reply
      .code(200)
      .type('image/svg+xml')
      .header('Cache-Control', 'public, max-age=0, must-revalidate')
      .send(card)
  }
})

app.get('/discord/:id', async (request, reply) => {
  if (!request.params) return reply.code(400).send('No User ID Provided')

  const { id } = request.params as { id: string }
  const data = await dataManager.discord(id)

  if (!data) return reply.code(400).send('User Not Found')

  const card = await cacheManager.generateCachedCard(data, discordCard)

  reply
    .code(200)
    .type('image/svg+xml')
    .header('Cache-Control', 'public, max-age=0, must-revalidate')
    .send(card)
})

app.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) throw err
})
