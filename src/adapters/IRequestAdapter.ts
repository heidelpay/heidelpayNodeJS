import { Config } from '../Config'

export interface IRequestAdapter {
  get(payload: string): Promise<Response>
  post(payload: string): Promise<Response>
  put(payload: string): Promise<Response>
}
