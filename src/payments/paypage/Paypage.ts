import AbstractPaymentType from '../types/AbstractPaymentType'
import PaymentType from '../types/PaymentType'
import Resources from '../business/Resources'

export default class Paypage extends AbstractPaymentType implements PaymentType {
  private amount: string | number
  private currency: string
  private returnUrl: string
  private logoImage: string
  private basketImage: string
  private fullPageImage: string
  private shopName: string
  private descriptionMain: string
  private descriptionSmall: string
  private termsAndConditionUrl: string
  private privacyPolicyUrl: string
  private impressumUrl: string
  private helpUrl: string
  private contactUrl: string
  private resources: Resources
  private typeUrl: string
  private redirectUrl: string
  private action: string

  constructor() {
    super()
    this.resources = new Resources()
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
   * Get Payload
   *
   * @returns
   */
  public getPayload() {
    const payload: any = {
      amount: this.getAmount(),
      currency: this.getCurrency(),
      returnUrl: this.getReturnUrl(),
      logoImage: this.getLogoImage(),
      basketImage: this.getBasketImage(),
      fullPageImage: this.getFullPageImage(),
      shopName: this.getShopName(),
      descriptionMain: this.getDescriptionMain(),
      descriptionSmall: this.getDescriptionSmall(),
      termsAndConditionUrl: this.getTermsAndConditionUrl(),
      privacyPolicyUrl: this.getPrivacyPolicyUrl(),
      impressumUrl: this.getImpressumUrl(),
      helpUrl: this.getHelpUrl(),
      contactUrl: this.getContactUrl(),
      resources: this.getResources(),
    }

    return payload
  }

  /**
   * Get Amount
   *
   * @param {string} amount
   * @returns {string}
   */
  public getAmount(): string|number {
      return this.amount
  }

  /**
   * Set amount
   *
   * @param {string} amount
   * @returns {Card}
   */
  public setAmount(amount: string|number): Paypage {
      this.amount = amount
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
   * @returns {Paypage}
   */
  public setCurrency(currency: string): Paypage {
      this.currency = currency
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
   * @returns {Paypage}
   */
  public setReturnUrl(returnUrl: string): Paypage {
      this.returnUrl = returnUrl
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
   * @returns {Paypage}
   */
  public setLogoImage(logoImage: string): Paypage {
      this.logoImage = logoImage
      return this
  }

  /**
   * Get basket image
   *
   * @returns {string}
   */
  public getBasketImage(): string {
      return this.basketImage
  }

  /**
   * Set basket image
   *
   * @param {string} basketImage
   * @returns {Paypage}
   */
  public setBasketImage(basketImage: string): Paypage {
      this.basketImage = basketImage
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
   * @returns {Paypage}
   */
  public setFullPageImage(fullPageImage: string): Paypage {
      this.fullPageImage = fullPageImage
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
   * @returns {Paypage}
   */
  public setShopName(shopName: string): Paypage {
      this.shopName = shopName
      return this
  }

  /**
   * Get main description
   *
   * @returns {string}
   */
  public getDescriptionMain(): string {
      return this.descriptionMain
  }

  /**
   * Set main description
   *
   * @param {string} descriptionMain
   * @returns {Paypage}
   */
  public setDescriptionMain(descriptionMain: string): Paypage {
      this.descriptionMain = descriptionMain
      return this
  }

  /**
   * Get small description
   *
   * @returns {string}
   */
  public getDescriptionSmall(): string {
      return this.descriptionSmall
  }

  /**
   * Set main description
   *
   * @param {string} descriptionSmall
   * @returns {Paypage}
   */
  public setDescriptionSmall(descriptionSmall: string): Paypage {
      this.descriptionSmall = descriptionSmall
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
   * @returns {Paypage}
   */
  public setTermsAndConditionUrl(termsAndConditionUrl: string): Paypage {
      this.termsAndConditionUrl = termsAndConditionUrl
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
   * @returns {Paypage}
   */
  public setPrivacyPolicyUrl(privacyPolicyUrl: string): Paypage {
      this.privacyPolicyUrl = privacyPolicyUrl
      return this
  }

  /**
   * Get Impressum URL
   *
   * @returns {string}
   */
  public getImpressumUrl(): string {
      return this.impressumUrl
  }

  /**
   * Set Impresssum URL
   *
   * @param {string} impressumUrl
   * @returns {Paypage}
   */
  public setImpressumUrl(impressumUrl: string): Paypage {
      this.impressumUrl = impressumUrl
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
   * @returns {Paypage}
   */
  public setHelpUrl(helpUrl: string): Paypage {
      this.helpUrl = helpUrl
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
   * @returns {Paypage}
   */
  public setContactUrl(contactUrl: string): Paypage {
      this.contactUrl = contactUrl
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
   * @returns {Paypage}
   */
  public setRedirectUrl(redirectUrl: string): Paypage {
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
 * @returns {Paypage}
 */
public setAction(action: string): Paypage {
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
   * Set resources
   *
   * @param {*} resources
   */
  public setResources(resources: any) {
    this.resources
      .setCustomerId(resources.customerId)
      .setMetadataId(resources.metadataId)
      .setPaymentId(resources.paymentId)
      .setBasketId(resources.basketId)
  }
}