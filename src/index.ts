import { LanyardRequest } from './http'
import fastify from 'fastify'

const app = fastify({
  logger: true,
})

const lanyard = new LanyardRequest()

app.get('/', async (_, reply) => {
  reply.redirect('https://github.com/star0202/discord-profile')
})

app.get('/users/:id', async (request, reply) => {
  if (!request.params) reply.code(400).send('No User ID Provided')

  const { id } = request.params as { id: string }
  const { data } = await lanyard.getUser(id)

  reply.code(200).send(data)
})

app.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) throw err
})
