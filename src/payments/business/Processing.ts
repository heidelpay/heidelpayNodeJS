export default class Processing {
  private _uniqueId: string
  private _shortId: string
  
  /**
   * Get UniqueId
   *
   * @returns {string}
   */
  public getUniqueId(): string {
    return this._uniqueId
  }

  /**
   * Set Unique Id
   *
   * @param {string} uniqueId
   * @returns {Processing}
   */
  public setUniqueId(uniqueId: string): Processing {
    this._uniqueId = uniqueId
    return this
  }

  /**
   * Get Short Id
   *
   * @returns {string}
   */
  public getShortId(): string {
    return this._shortId
  }

  /**
   * Set Short Id
   *
   * @param {string} shortId
   * @returns {Processing}
   */
  public setShortId(shortId: string): Processing {
    this._shortId = shortId
    return this
  }
}
