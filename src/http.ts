import { Lanyard } from './types'
import axios, { AxiosInstance } from 'axios'

export class LanyardRequest {
  private rest: AxiosInstance

  constructor() {
    this.rest = axios.create({
      baseURL: 'https://api.lanyard.rest/v1',
    })
  }

  async getUser(id: string) {
    const { data } = await this.rest.get(`/users/${id}`)

    return data as Lanyard
  }
}
