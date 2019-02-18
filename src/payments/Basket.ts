class Basket {
  private _id: string
	private _amountTotal: string
  private _amountTotalDiscount: string  
  private _currencyCode: string
  private _orderId: string
  private _note: string
  private _payload: object
  private _basketItems: Array<basketItemObject>

  constructor() {
    this._basketItems = []
  }

  /**
   * Set Id
   * @param {string} id
   */
  public setId(id: string): Basket{
    this._id = id
    return this
  }

  /**
   * Get Id
   *
   * @type {string}
   */
  public getId(): string {
    return this._id
  }

  /**
   * Set payload object
   *
   * @param {*} payload
   * @returns
   */
  public setPayload(payload: any) {
    return this._payload = payload
  }
  
  /**
   * Get payload object
   *
   * @returns {*}
   */
  public getPayload(): any {
    return this._payload
  }

  /**
   * Get Request Payload
   */
  public getRequestPayload() {
    return {
      amountTotal: this.getAmountTotal(),
      amountTotalDiscount: this.getAmountTotalDiscount(),
      currencyCode: this.getCurrencyCode(),
      orderId: this.getOrderId(),
      note: this.getNote(),
      basketItems: this.getItems(),
    }
  }

  /**
   * Set amount total
   * @param {string} value 
   * @returns {Basket}
   */
  public setAmountTotal(value: string): Basket {
    this._amountTotal = value
    return this
  }

  /**
   * Get amount total
   * @param {string} value 
   */
  public getAmountTotal(): string{
    return this._amountTotal
  }

  /**
   * Set amount total discount
   * @param {string} value 
   * @returns {Basket}
   */
  public setAmountTotalDiscount(value: string): Basket {
    this._amountTotalDiscount = value
    return this
  }

  /**
   * Get amount total discount
   * @param {string} value 
   */
  public getAmountTotalDiscount(): string{
    return this._amountTotalDiscount
  }

  /**
   * Set currency code
   * @param {string} value 
   * @returns {Basket}
   */
  public setCurrencyCode(value: string): Basket {
    this._currencyCode = value
    return this
  }

  /**
   * Get currency code
   * @param {string} value 
   */
  public getCurrencyCode(): string{
    return this._currencyCode
  }

  /**
   * Set order Id
   * @param {string} value 
   * @returns {Basket}
   */
  public setOrderId(value: string): Basket {
    this._orderId = value
    return this
  }

  /**
   * Get Order Id
   * @param {string} value 
   */
  public getOrderId(): string{
    return this._orderId
  }

  /**
   * Set basket note
   * @param {string} value 
   * @returns {Basket}
   */
  public setNote(value: string): Basket {
    this._note = value
    return this
  }

  /**
   * Get note for basket
   * @param {string} value 
   */
  public getNote(): string{
    return this._note
  }

  /**
   * Add basket Item
   * @param {basketItemObject} item
   */
  public addItem(item: basketItemObject) {
    this._basketItems.push(item)
  }

  /**
   * Get basket Item
   * @param {basketItemObject} item
   * @returns {Array<basketItemObject>}
   */
  public getItems(): Array<basketItemObject> {
    return this._basketItems
  }
}

export type basketItemObject = {
  title: string,
  basketItemReferenceId: string,
  unit?: string,
  quantity: number,
  amountDiscount?: string,
  vat?: string,
  amountGross?: string,
  amountVat?: string,
  amountPerUnit: string,
  amountNet: string,
}

export default Basket