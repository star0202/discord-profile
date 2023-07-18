/* eslint-disable @typescript-eslint/no-explicit-any */
import sha256 from 'crypto-js/sha256'
import type { FastifyBaseLogger } from 'fastify'
import { appendFile, readFile } from 'fs/promises'
import { join } from 'path'

export default class CacheManager {
  private logger: FastifyBaseLogger

  constructor(logger: FastifyBaseLogger) {
    this.logger = logger.child({ name: 'Cache' })
  }

  async isCached(data: any) {
    const hash = sha256(JSON.stringify(data)).toString()

    return readFile(join(__dirname, `../../cache/${hash}.svg`))
      .then(() => true)
      .catch(() => false)
  }

  async cache(data: any, svg: string) {
    const hash = sha256(JSON.stringify(data)).toString()

    this.logger.info(`Caching ${hash}`)

    await appendFile(join(__dirname, `../../cache/${hash}.svg`), svg)
  }

  async getCache(data: any) {
    const hash = sha256(JSON.stringify(data)).toString()

    this.logger.info(`Using cache ${hash}`)

    return await readFile(join(__dirname, `../../cache/${hash}.svg`), 'utf-8')
  }

  async generateCachedCard(
    data: any,
    generate: (data: any) => Promise<string>
  ) {
    if (await this.isCached(data)) return await this.getCache(data)

    const svg = await generate(data)
    await this.cache(data, svg)

    return svg
  }
}
