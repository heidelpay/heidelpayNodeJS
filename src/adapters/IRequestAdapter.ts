import { Config } from '../Config'

export interface IRequestAdapter {
  get(payload: string): Promise<Response>
  post(payload: string, body: object): Promise<Response>
  put(payload: string, body: object): Promise<Response>
}
