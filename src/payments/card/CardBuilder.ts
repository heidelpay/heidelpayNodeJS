import Card from './Card'

/**
 * Class Card Builder
 *
 * @export
 * @class CardBuilder
 */
export default class CardBuilder {
  /**
   * Pan number property
   *
   * @private
   * @type {string}
   */
  private _panNumber: string

  /**
   * CVC number property
   *
   * @private
   * @type {string}
   */
  private _cvc: string

  /**
   * Expiry date property
   *
   * @private
   * @type {string}
   */
  private _expiryDate: string

  /**
   * Creates an instance of CardBuilder.
   */
  constructor() {
    this._panNumber = ''
    this._cvc = ''
    this._expiryDate = ''
  }

  /**
   * Get pan number
   *
   * @returns {string}
   */
  public getPanNumber(): string {
    return this._panNumber
  }

  public setPanNumber(panNumber: string): CardBuilder {
    this._panNumber = panNumber
    return this
  }

  public getCVC(): string {
    return this._cvc
  }

  public setCVC(cvc: string): CardBuilder {
    this._cvc = cvc
    return this
  }

  public getExpiryDate(): string {
    return this._expiryDate
  }

  public setExpiryDate(expiryDate: string): CardBuilder {
    this._expiryDate = expiryDate
    return this
  }

  /**
   * Create a card
   *
   * @returns {Card}
   */
  create(): Card {
    return new Card(this)
  }
}
