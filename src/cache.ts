import { app } from '.'
import sha256 from 'crypto-js/sha256'
import { appendFile, readFile } from 'fs/promises'
import { join } from 'path'

export const isCached = async (data: object) => {
  const hash = sha256(JSON.stringify(data)).toString()

  return readFile(join(__dirname, `../cache/${hash}.svg`))
    .then(() => true)
    .catch(() => false)
}

export const cache = async (data: object, svg: string) => {
  const hash = sha256(JSON.stringify(data)).toString()

  app.log.info(`Caching ${hash}`)

  await appendFile(join(__dirname, `../cache/${hash}.svg`), svg)
}

export const getCache = async (data: object) => {
  const hash = sha256(JSON.stringify(data)).toString()

  app.log.info(`Using cache ${hash}`)

  return await readFile(join(__dirname, `../cache/${hash}.svg`), 'utf-8')
}
