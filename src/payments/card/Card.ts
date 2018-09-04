import CardBuilder from './CardBuilder'

/**
 * Class Card
 *
 * @export
 * @class Card
 */
export default class Card {
  private _panNumber: string
  private _cvc: string
  private _expiryDate: string

  constructor(builder: CardBuilder) {
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
