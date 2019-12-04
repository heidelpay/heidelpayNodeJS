import AbstractPaymentType from '../types/AbstractPaymentType'
import PaymentType from '../types/PaymentType'
import Resources from '../business/Resources'

export default class Linkpay extends AbstractPaymentType implements PaymentType {
  private alias: string
  private amount: string | number
  private additionalAttributes: any
  private billingAddressRequired: string
  private currency: string
  private card3ds: string
  private css: any
  private contactUrl: string
  private excludeTypes: Array<string>
  private expires: string
  private fullPageImage: string
  private helpUrl: string
  private invoiceId: string
  private invoiceIdRequired: string
  private imprintUrl: string
  private intention: string
  private logoImage: string
  private privacyPolicyUrl: string
  private orderId: string
  private orderIdRequired: string
  private resources: Resources
  private returnUrl: string
  private shopName: string
  private shopDescription: string
  private shippingAddressRequired: string
  private tagline: string
  private termsAndConditionUrl: string
  
  private payloadObj: any
  private redirectUrl: string
  private action: string
  private typeUrl: string

  constructor() {
    super()
    this.additionalAttributes = {}
    this.resources = new Resources()
    this.payloadObj = {}
  }

  /**
   * Get url end point
   *
   * @returns {string}
   */
  public getTypeUrl(): string {
    return this.typeUrl
  }

  /**
   * Get url end point
   *
   * @returns {string}
   */
  public resetPayload(): Linkpay {
    this.payloadObj = {}
    return this
  }

  /**
   * Get Payload
   *
   * @returns {any}
   */
  public getPayload() {
    return this.payloadObj
  }

  /**
   * Get Amount
   *
   * @param {string} amount
   * @returns {string}
   */
  public getAmount(): string | number {
    return this.amount
  }

  /**
   * Set amount
   *
   * @param {string} amount
   * @returns {Card}
   */
  public setAmount(amount: string | number): Linkpay {
    this.amount = amount
    this.payloadObj.amount = amount
    return this
  }

  /**
   * Get currency
   *
   * @returns {string}
   */
  public getCurrency(): string {
    return this.currency
  }

  /**
   * Set currency
   *
   * @param {string} currency
   * @returns {Linkpay}
   */
  public setCurrency(currency: string): Linkpay {
    this.currency = currency
    this.payloadObj.currency = currency
    return this
  }

  /**
   * Get return URL
   *
   * @returns {string}
   */
  public getReturnUrl(): string {
    return this.returnUrl
  }

  /**
   * Set return URL
   *
   * @param {string} returnUrl
   * @returns {Linkpay}
   */
  public setReturnUrl(returnUrl: string): Linkpay {
    this.returnUrl = returnUrl
    this.payloadObj.returnUrl = returnUrl
    return this
  }

  /**
   * Get logo image
   *
   * @returns {string}
   */
  public getLogoImage(): string {
    return this.logoImage
  }

  /**
   * Set logo image
   *
   * @param {string} logoImage
   * @returns {Linkpay}
   */
  public setLogoImage(logoImage: string): Linkpay {
    this.logoImage = logoImage
    this.payloadObj.logoImage = logoImage
    return this
  }

  /**
   * Get fullpage image
   *
   * @returns {string}
   */
  public getFullPageImage(): string {
    return this.fullPageImage
  }

  /**
   * Set fullpage image
   *
   * @param {string} fullPageImage
   * @returns {Linkpay}
   */
  public setFullPageImage(fullPageImage: string): Linkpay {
    this.fullPageImage = fullPageImage
    this.payloadObj.fullPageImage = fullPageImage
    return this
  }

  /**
   * Get shop name
   *
   * @returns {string}
   */
  public getShopName(): string {
    return this.shopName
  }

  /**
   * Set shop name
   *
   * @param {string} shopName
   * @returns {Linkpay}
   */
  public setShopName(shopName: string): Linkpay {
    this.shopName = shopName
    this.payloadObj.shopName = shopName
    return this
  }

  /**
   * Get shop description
   *
   * @returns {string}
   */
  public getShopDescription(): string {
    return this.shopDescription
  }

  /**
   * Set shop description
   *
   * @param {string} shopDescription
   * @returns {Linkpay}
   */
  public setShopDescription(shopDescription: string): Linkpay {
    this.shopDescription = shopDescription
    this.payloadObj.shopDescription = shopDescription

    return this
  }

  /**
   * Get tagline
   *
   * @returns {string}
   */
  public getTagline(): string {
    return this.tagline
  }

  /**
   * Set tagline
   *
   * @param {string} tagline
   * @returns {Linkpay}
   */
  public setTagline(tagline: string): Linkpay {
    this.tagline = tagline
    this.payloadObj.tagline = tagline
    return this
  }

  /**
   * Get card3ds
   *
   * @returns {string}
   */
  public getCard3ds(): string {
    return this.card3ds
  }

  /**
   * Set card3ds
   *
   * @param {string} card3ds
   * @returns {Linkpay}
   */
  public setCard3ds(card3ds: string): Linkpay {
    this.card3ds = card3ds
    this.payloadObj.card3ds = card3ds
    return this
  }

  /**
   * Get Invoice Id
   *
   * @returns {string}
   */
  public getInvoiceId(): string {
    return this.invoiceId
  }

  /**
   * Set Additional attributes
   *
   * @param {object} additionalAttributes
   * @returns {Linkpay}
   */
  public setAdditionalAttributes(additionalAttributes: object): Linkpay {
    this.additionalAttributes = additionalAttributes
    this.payloadObj.additionalAttributes = additionalAttributes
    return this
  }

  /**
   * Get Additional attributes
   *
   * @returns {object}
   */
  public getAdditionalAttributes(): object {
    return this.additionalAttributes
  }

  /**
   * Set Invoice Id
   *
   * @param {string} invoiceId
   * @returns {Linkpay}
   */
  public setInvoiceId(invoiceId: string): Linkpay {
    this.invoiceId = invoiceId
    this.payloadObj.invoiceId = invoiceId
    return this
  }

  /**
   * Get terms and condition URL
   *
   * @returns {string}
   */
  public getTermsAndConditionUrl(): string {
    return this.termsAndConditionUrl
  }

  /**
   * Set terms and condition URL
   *
   * @param {string} termsAndConditionUrl
   * @returns {Linkpay}
   */
  public setTermsAndConditionUrl(termsAndConditionUrl: string): Linkpay {
    this.termsAndConditionUrl = termsAndConditionUrl
    this.payloadObj.termsAndConditionUrl = termsAndConditionUrl
    return this
  }

  /**
   * Get privacy URL
   *
   * @returns {string}
   */
  public getPrivacyPolicyUrl(): string {
    return this.privacyPolicyUrl
  }

  /**
   * Set privacy URL
   *
   * @param {string} privacyPolicyUrl
   * @returns {Linkpay}
   */
  public setPrivacyPolicyUrl(privacyPolicyUrl: string): Linkpay {
    this.privacyPolicyUrl = privacyPolicyUrl
    this.payloadObj.privacyPolicyUrl = privacyPolicyUrl
    return this
  }

  /**
   * Get Imprint URL
   *
   * @returns {string}
   */
  public getImprintUrl(): string {
    return this.imprintUrl
  }

  /**
   * Set Imprint URL
   *
   * @param {string} imprintUrl
   * @returns {Linkpay}
   */
  public setImprintUrl(imprintUrl: string): Linkpay {
    this.imprintUrl = imprintUrl
    this.payloadObj.imprintUrl = imprintUrl
    return this
  }

  /**
   * Get Help URL
   *
   * @returns {string}
   */
  public getHelpUrl(): string {
    return this.helpUrl
  }

  /**
   * Set Help URL
   *
   * @param {string} helpUrl
   * @returns {Linkpay}
   */
  public setHelpUrl(helpUrl: string): Linkpay {
    this.helpUrl = helpUrl
    this.payloadObj.helpUrl = helpUrl
    return this
  }

  /**
   * Set contact URL
   *
   * @returns {string}
   */
  public getContactUrl(): string {
    return this.contactUrl
  }

  /**
   * Set contact URL
   *
   * @param {string} contactUrl
   * @returns {Linkpay}
   */
  public setContactUrl(contactUrl: string): Linkpay {
    this.contactUrl = contactUrl
    this.payloadObj.contactUrl = contactUrl
    return this
  }

  /**
   * Get redirectUrl 
   *
   * @returns {string}
   */
  public getRedirectUrl(): string {
    return this.redirectUrl
  }


  /**
   * Set redirectUrl
   *
   * @param {string} redirectUrl
   * @returns {Linkpay}
   */
  public setRedirectUrl(redirectUrl: string): Linkpay {
    this.redirectUrl = redirectUrl
    return this
  }

  /**
   * Get action 
   *
   * @returns {string}
   */
  public getAction(): string {
    return this.action
  }

  /**
   * Set redirectUrl
   *
   * @param {string} redirectUrl
   * @returns {Linkpay}
   */
  public setAction(action: string): Linkpay {
    this.action = action
    return this
  }

  /**
   * Get resources
   *
   * @returns {Resources}
   */
  public getResources(): Resources {
    return this.resources
  }

  /**
   * Set excludeTypes
   *
   * @param {Array<string>} excludeTypes
   * @returns {Linkpay}
   */
  public setExcludeTypes(excludeTypes: Array<string>): Linkpay {
    this.excludeTypes = excludeTypes
    this.payloadObj.excludeTypes = excludeTypes
    return this
  }

  /**
   * Get excludeTypes
   *
   * @returns {Array<string>}
   */
  public getExcludeTypes(): Array<string> {
    return this.excludeTypes
  }

  /**
   * Set alias
   *
   * @param {string} alias
   * @returns {Linkpay}
   */
  public setAlias(alias: string): Linkpay {
    this.alias = alias
    this.payloadObj.alias = alias
    return this
  }

  /**
   * Get alias
   *
   * @returns {string}
   */
  public getAlias(): string {
    return this.alias
  }  

  /**
   * Set invoiceIdRequired
   *
   * @param {string} invoiceIdRequired
   * @returns {Linkpay}
   */
  public setInvoiceIdRequired(invoiceIdRequired: string): Linkpay {
    this.invoiceIdRequired = invoiceIdRequired
    this.payloadObj.invoiceIdRequired = invoiceIdRequired
    return this
  }

  /**
   * Get invoiceIdRequired
   *
   * @returns {string}
   */
  public getInvoiceIdRequired(): string {
    return this.invoiceIdRequired
  }

  /**
   * Set orderId
   *
   * @param {string} orderId
   * @returns {Linkpay}
   */
  public setOrderId(orderId: string): Linkpay {
    this.orderId = orderId
    this.payloadObj.orderId = orderId
    return this
  }

  /**
   * Get orderId
   *
   * @returns {string}
   */
  public getOrderId(): string {
    return this.orderId
  }

  /**
   * Set orderIdRequired
   *
   * @param {string} orderIdRequired
   * @returns {Linkpay}
   */
  public setOrderIdRequired(orderIdRequired: string): Linkpay {
    this.orderIdRequired = orderIdRequired
    this.payloadObj.orderIdRequired = orderIdRequired
    return this
  }

  /**
   * Get orderIdRequired
   *
   * @returns {string}
   */
  public getOrderIdRequired(): string {
    return this.orderIdRequired
  }
  
  /**
   * Set billingAddressRequired
   *
   * @param {string} billingAddressRequired
   * @returns {Linkpay}
   */
  public setBillingAddressRequired(billingAddressRequired: string): Linkpay {
    this.billingAddressRequired = billingAddressRequired
    this.payloadObj.billingAddressRequired = billingAddressRequired
    return this
  }

  /**
   * Get billingAddressRequired
   *
   * @returns {string}
   */
  public getBillingAddressRequired(): string {
    return this.billingAddressRequired
  }  

  /**
   * Set shippingAddressRequired
   *
   * @param {string} shippingAddressRequired
   * @returns {Linkpay}
   */
  public setShippingAddressRequired(shippingAddressRequired: string): Linkpay {
    this.shippingAddressRequired = shippingAddressRequired
    this.payloadObj.shippingAddressRequired = shippingAddressRequired
    return this
  }

  /**
   * Get shippingAddressRequired
   *
   * @returns {string}
   */
  public getShippingAddressRequired(): string {
    return this.shippingAddressRequired
  }

  /**
   * Set expirationDate
   *
   * @param {string} expirationDate
   * @returns {Linkpay}
   */
  public setExpirationDate(expirationDate: string): Linkpay {
    this.expires = expirationDate
    this.payloadObj.expires = expirationDate
    return this
  }

  /**
   * Get expirationDate
   *
   * @returns {string}
   */
  public getExpirationDate(): string {
    return this.expires
  }

  /**
   * Set intention
   *
   * @param {string} intention
   * @returns {Linkpay}
   */
  public setIntention(intention: string): Linkpay {
    this.intention = intention
    this.payloadObj.intention = intention
    return this
  }

  /**
   * Get intention
   *
   * @returns {string}
   */
  public getIntention(): string {
    return this.intention
  }

  /**
   * Set css
   *
   * @param {any} css
   * @returns {Linkpay}
   */
  public setCss(css: any): Linkpay {
    this.css = css
    this.payloadObj.css = css
    return this
  }

  /**
   * Get css
   *
   * @returns {any}
   */
  public getCss(): any {
    return this.css
  }  

  /**
   * Set resources
   *
   * @param {*} resources
   */
  public setResources(resources: any) {
    const { customerId, metadataId, paymentId, basketId } = resources
    this.resources
      .setCustomerId(customerId)
      .setMetadataId(metadataId)
      .setPaymentId(paymentId)
      .setBasketId(basketId)

    const resourcesObj: any = {
      customerId: customerId,
      metadataId: metadataId,
      paymentId: paymentId,
      basketId: basketId
    }
    this.payloadObj.resources = resourcesObj
    return this
  }
}