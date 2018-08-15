class RequestAdapter {
  constructor(config = {}) {
    this.config = config
    this.apiUrl = `${this.config.protocol}://${this.config.api_host}/${this.config.version}`
  }

  get = resource => {
    return this._fetch(resource, {
      method: 'GET'
    })
  }
  post = (resource, body = {}) => {
    return this._fetch(resource, {
      method: 'POST',
      body: JSON.stringify(body)
    })
  }
  put = (resource, body = {}) => {
    return this._fetch(resource, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
  }

  _fetch = async (resource, options = {}) => {
    try {
      const response = await fetch(`${this.apiUrl}${resource}`, {
        headers: {
          Authorization: this.config.private_key,
          'Content-Type': 'application/json'
        },
        ...options
      })

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json()
        return {
          success: true,
          data
        }
      } else {
        const error = await response.json()
        return {
          error: error.errors[0].customerMessage,
          details: error.errors
        }
      }
    } catch (error) {
      return {
        error: __trs('Network Error'),
        errorResponse: error
      }
    }
  }
}

export default RequestAdapter

