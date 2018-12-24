const Base64 = require('js-base64').Base64
require('es6-promise').polyfill()
require('isomorphic-fetch')
/**
 * Fetch Adapter
 *
 * @export
 * @class FetchAdapter
 */
export class FetchAdapter {
  private api: string

  constructor() {
    const config = {
      apiProtocol: 'https',
      apiHost: 'api.heidelpay.com',
      apiVersion: 'v1'
    }

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
          Authorization: `Basic ${basicAuthValue}`,
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
