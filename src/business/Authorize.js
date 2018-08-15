/**
 * Authorize
 * @class
 **/
export default class Authorize {
  constructor(amount, currency, returnUrl, type) {
    this.amount = amount
    this.currency = currency
    this.returnUrl = returnUrl
    this.type = type
  }

  cancel() {}
}
