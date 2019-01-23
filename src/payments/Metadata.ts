export default class Metadata{
  private _id: string
  private _metadata: Object

  constructor() {}

  /**
   * Set Id
   * @param {string} id
   */
  public setId(id: string): Metadata{
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
   * Set metadata value
   *
   * @param {object} value
   * @returns {Metadata}
   */
  public setValue(value: object): Metadata {
    this._metadata = value
    return this
  }

  /**
   * Get metadata value
   *
   * @type {object}
   */
  public getValue(): object {
    return this._metadata
  }

  /**
   * Get Request Payload
   */
  public getRequestPayload() {
    return this._metadata
  }
}