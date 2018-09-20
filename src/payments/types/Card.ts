import * as apiURL from '../../configs/ApiUrls'
import AbstractPaymentType from './AbstractPaymentType'
import PaymentType from './PaymentType'

export default class Card extends AbstractPaymentType implements PaymentType {
  private _panNumber: string
  private _cvc: string
  private _expiryDate: string

  constructor(panNumber: string = '', expiryDate: string = '') {
    super()
    this._panNumber = panNumber
    this._expiryDate = expiryDate
  }

  /**
   * Get url end point
   *
   * @returns {string}
   */
  public getTypeUrl(): string {
    return apiURL.URL_TYPE_CARD
  }

  /**
   * Get Payload
   *
   * @returns
   */
  public getPayload() {
    return {
      number: this.getPanNumber(),
      cvc: this.getCVC(),
      expiryDate: this.getExpiryDate()
    }
  }

  /**
   * Set pan number
   *
   * @param {string} panNumber
   * @returns {Card}
   */
  public setPanNumber(panNumber: string): Card {
    this._panNumber = panNumber
    return this
  }

  /**
   * Get pan number
   *
   * @returns {string}
   */
  public getPanNumber(): string {
    return this._panNumber
  }

  /**
   * Set CVC number
   *
   * @param {string} cvc
   * @returns {Card}
   */
  public setCVC(cvc: string): Card {
    this._cvc = cvc
    return this
  }

  /**
   * Get CVC
   *
   * @returns {string}
   */
  public getCVC(): string {
    return this._cvc
  }

  /**
   * Set expiry date
   *
   * @param {string} expiryDate
   * @returns {Card}
   */
  public setExpiryDate(expiryDate: string): Card {
    this._expiryDate = expiryDate
    return this
  }

  /**
   * Get expirty Date
   *
   * @returns {string}
   */
  public getExpiryDate(): string {
    return this._expiryDate
  }
}
