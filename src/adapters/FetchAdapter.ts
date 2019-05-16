const Base64 = require('js-base64').Base64
require('es6-promise').polyfill()
require('isomorphic-fetch')
import Environment from '../configs/Environment'
import {SDK_TYPE, SDK_VERSION} from '../configs/Version'
/**
 * Fetch Adapter
 *
 * @export
 * @class FetchAdapter
 */
export class FetchAdapter {
  private api: string
  private locale?: string

  constructor(locale?: string, env?: string) {
    let argsConfig

    switch(env) {
      case 'development':
        argsConfig = Environment['development']
        break
      case 'staging':
        argsConfig = Environment['staging']
        break
      default:
        argsConfig = Environment['production']
    }

    const config = {
      apiProtocol: argsConfig.apiProtocol,
      apiHost: argsConfig.apiHost,
      apiVersion: argsConfig.apiVersion,
    }

    this.locale = locale
    this.api = `${config.apiProtocol}://${config.apiHost}/${config.apiVersion}`
  }

  /**
   * @param  {string} url
   */
  public get(url: string, privateKey: string, isRawUrl: Boolean = false): Promise<Response> {
    return this._fetch(
      url,
      {
        method: 'GET'
      },
      privateKey,
      isRawUrl
    )
  }

  /**
   * @param  {string} url
   * @param  {object} body
   */
  public post(url: string, body: object, privateKey: string, isRawUrl: Boolean = false): Promise<Response> {
    return this._fetch(
      url,
      {
        method: 'POST',
        body: JSON.stringify(body)
      },
      privateKey,
      isRawUrl
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

  /**
   * @param  {string} url
   * @param  {object} body
   */
  public delete(url: string, body: object, privateKey: string) {
    return this._fetch(
      url,
      {
        method: 'DELETE',
        body: JSON.stringify(body)
      },
      privateKey
    )
  }

  private _fetch(url: string, options = {}, privateKey: string, isRawUrl: Boolean = false): Promise<Response> {
    return new Promise((resolve, reject) => {

      const password = ''
      const basicAuthValue = Base64.encode(`${privateKey}:${password}`)
      const requestUrl = isRawUrl === true ? url : `${this.api}${url}`

      fetch(requestUrl, {
        headers: {
          'SDK-TYPE': SDK_TYPE,
          'SDK-VERSION': SDK_VERSION,
          'Authorization': `Basic ${basicAuthValue}`,
          'Accept-Language': this.locale || 'en_US',
          'Content-Type': 'application/json'
        },
        ...options
      })
        .then(response => {
          resolve(response.json())
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
