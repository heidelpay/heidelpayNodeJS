require('es6-promise').polyfill()
require('isomorphic-fetch')

import { IRequestAdapter } from './IRequestAdapter'
import { Config } from '../Config'

export class FetchAdapter implements IRequestAdapter {
  private config: Config
  private apiUrl: string

  constructor(config: Config) {
    this.config = config
    this.apiUrl = `${config.getApiProtocol()}://${config.getApiHost()}/${config.getApiVersion()}`
  }

  /**
   * @param  {string} payload
   */
  public get(payload: string): Promise<Response> {
    return this._fetch(payload, {
      method: 'GET'
    })
  }
  /**
   * @param  {string} payload
   * @param  {object} body
   */
  public post(payload: string, body: object): Promise<Response> {
    return this._fetch(payload, {
      method: 'POST',
      body: JSON.stringify(body)
    })
  }

  /**
   * @param  {string} payload
   * @param  {object} body
   */
  public put(payload: string, body: object) {
    return this._fetch(payload, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
  }

  private _fetch(payload: string, options = {}): Promise<Response> {
    return fetch(`${this.apiUrl}${payload}`, {
      headers: {
        Authorization: this.config.getPrivateKey(),
        'Content-Type': 'application/json'
      },
      ...options
    })
      .then(function(response) {
        return response.json()
      })
      .catch(function(error) {
        return error
      })
  }
}
