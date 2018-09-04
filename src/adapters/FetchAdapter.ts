require('es6-promise').polyfill()
require('isomorphic-fetch')

import { RequestAdapter } from './RequestAdapter'
import { Config } from '../Config'

/**
 * Fetch Adapter
 *
 * @export
 * @class FetchAdapter
 * @implements {RequestAdapter}
 */
export class FetchAdapter implements RequestAdapter {
  private api: string

  constructor() {
    const config = new Config()
    this.api = `${config.getApiProtocol()}://${config.getApiHost()}/${config.getApiVersion()}`
  }

  /**
   * @param  {string} url
   */
  public get(url: string, privateKey: string): Promise<Response> {
    return this._fetch(
      url,
      {
        method: 'GET'
      },
      privateKey
    )
  }

  /**
   * @param  {string} url
   * @param  {object} body
   */
  public post(url: string, body: object, privateKey: string): Promise<Response> {
    return this._fetch(
      url,
      {
        method: 'POST',
        body: JSON.stringify(body)
      },
      privateKey
    )
  }

  /**
   * @param  {string} url
   * @param  {object} body
   */
  public put(url: string, body: object, privateKey: string) {
    return this._fetch(
      url,
      {
        method: 'PUT',
        body: JSON.stringify(body)
      },
      privateKey
    )
  }

  private _fetch(url: string, options = {}, privateKey: string): Promise<Response> {
    return fetch(`${this.api}${url}`, {
      headers: {
        Authorization: privateKey,
        'Content-Type': 'application/json'
      },
      ...options
    })
      .then(response => {
        return response.json()
      })
      .catch(error => {
        return error
      })
  }
}
