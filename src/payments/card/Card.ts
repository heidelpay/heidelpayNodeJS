import CardBuilder from './CardBuilder'
import AbstractPaymentEntity from '../AbstractPaymentEntity'

/**
 * Class Card
 *
 * @export
 * @class Card
 */
export default class Card extends AbstractPaymentEntity {
  private _panNumber: string
  private _cvc: string
  private _expiryDate: string

  constructor(builder: CardBuilder) {
    super()
    this._panNumber = builder.getPanNumber()
    this._cvc = builder.getCVC()
    this._expiryDate = builder.getExpiryDate()
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
   * Get CVC
   *
   * @returns {string}
   */
  public getCVC(): string {
    return this._cvc
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
