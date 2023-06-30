import { readFileSync } from 'fs'
import { join } from 'path'
import type { ReactNode } from 'react'
import satori from 'satori'

export * from './discord'
export * from './spotify'

export const generate = async (element: ReactNode) => {
  return await satori(element, {
    height: 100,
    fonts: [
      {
        name: 'Pretendard-SemiBold',
        data: readFileSync(
          join(__dirname, '../../fonts/Pretendard-SemiBold.otf')
        ),
      },
      {
        name: 'PretendardJP-SemiBold',
        data: readFileSync(
          join(__dirname, '../../fonts/PretendardJP-SemiBold.otf')
        ),
      },
    ],
  })
}
