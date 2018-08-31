/**
 * @class CardBuilder
 */
class CardBuilder {
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

class Card {
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

export { CardBuilder, Card }
