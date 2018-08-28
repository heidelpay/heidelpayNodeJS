/**
 * Exception
 * @class
 * @property {string} message - Human friendly message
 * @property {string} type - Kind of error
 * @property {Exception} innerException - Inner exception
 **/

export class Exception {
  public message: string
  public innerException: Exception
  public type: string
  public isFinal: boolean

  /**
   * Constructor
   * @param {string} message - message - Human friendly message
   * @param {string} type - Kind of error
   * @param {Exception} innerException - Optional inner exception
   * @param {bool} isFinal - Indicates if this exception prevents further execution
   **/
  constructor(message: string | Error, type: string, innerException: Exception, isFinal: boolean) {
    if (!message) {
      throw new Error('Message is mandatory to create a new Exception')
    }

    if (message && message instanceof Error) {
      const err = message
      this.message = err.message || 'Unknown error'
    } else if (typeof message === 'string') {
      this.message = message
    } else if (message instanceof Exception) {
      return message
    } else {
      this.message = 'Unknown error'
    }

    this.innerException = innerException || null
    this.type = type || 'Generic exception'
    this.isFinal = isFinal || false
  }
}
