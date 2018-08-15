class Config {
  constructor(options) {
    const {
      private_key,
      langcode,
      api_host,
      version
    } = options

    this.application = 'heidelpay-node-sdk'
    this.private_key = private_key
    this.langcode = langcode || 'en_US'
    this.version = version || 'v1'
    this.protocol = 'https'
    this.api_host = api_host || 'api.heidelpay.com'
    this.sdk = {
      version,
      language: 'Node'
    }
  }
}

export default Config
