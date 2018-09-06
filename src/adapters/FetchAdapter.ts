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
      apiProtocol: process.env.API_PROTOCOL || 'https',
      apiHost: process.env.API_HOST || 'dev-api.heidelpay.com',
      apiVersion: process.env.API_VERSION || 'v1'
    }

    this.api = `${config.apiProtocol}://${config.apiHost}/${config.apiVersion}`
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
