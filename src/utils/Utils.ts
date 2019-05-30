import Card from '../payments/types/Card'
import AbstractPaymentType from '../payments/types/AbstractPaymentType'
import EPS from '../payments/types/Eps'
import Giropay from '../payments/types/Giropay'
import Paypal from '../payments/types/Paypal'
import Ideal from '../payments/types/Ideal'
import Invoice from '../payments/types/Invoice'
import InvoiceGuaranteed from '../payments/types/InvoiceGuaranteed'
import Prepayment from '../payments/types/Prepayment'
import Przelewy24 from '../payments/types/Przelewy24'
import SepaDirectDebit from '../payments/types/SepaDirectDebit'
import SepaDirectDebitGuaranteed from '../payments/types/SepaDirectDebitGuaranteed'
import Sofort from '../payments/types/Sofort'
import PIS from '../payments/types/Pis'
import Alipay from '../payments/types/Alipay'
import WechatPay from '../payments/types/WechatPay'

/**
 * Replace URL with parameters: {paymentId} => s-pay-1781
 *
 * @param {string} url
 * @param {*} args
 * @returns
 */
export const replaceUrl = (url: string, args: any) => {
  const regex = /{([a-zA-Z]+)}/gm

  const urlReplaced = url.replace(regex, (matches, item) => {
    return args[item] || ''
  })

  return urlReplaced
}

/**
 * Get refund id from url
 *
 * Ex:
 * <domain>payments/s-pay-3883/charges/s-chg-1/cancels/s-cnl-1
 * It should return s-chg-1 as refund Id of this cancel
 *
 * @param {string} url
 * @returns
 */
export const getRefundIdOfCancel = (url: string) => {
  const regex = /\/([a-zA-Z-0-9]+)\/cancels/gm
  const matches = regex.exec(url)

  return matches ? matches[1] : ''
}

/**
 * Get payment type from typeId
 * Ex:
 * crd => Card()
 * gro => GrioPay()
 * @param {string} typeId
 * @returns {AbstractPaymentType}
 */
export const getPaymentTypeFromTypeId = (typeId: string): AbstractPaymentType => {
  if (typeId.length < 5) {
    throw new Error(`Type ${typeId} is currently not supported by the SDK`)
  }

  const paymentType = typeId.substring(2, 5)
  switch (paymentType) {
    case 'crd':
      return new Card()
    case 'eps':
      return new EPS()
    case 'gro':
      return new Giropay()
    case 'ppl':
      return new Paypal()
    case 'idl':
      return new Ideal()
    case 'ivc':
      return new Invoice()
    case 'ivg':
      return new InvoiceGuaranteed()
    case 'ppy':
      return new Prepayment()
    case 'p24':
      return new Przelewy24()
    case 'sdd':
      return new SepaDirectDebit("")
    case 'ddg':
      return new SepaDirectDebitGuaranteed("")
    case 'sft':
      return new Sofort()
    case 'pis':
      return new PIS()
    case 'ali':
      return new Alipay()
    case 'wcp':
      return new WechatPay()
    default:
      throw new Error(`Type ${typeId} is currently not supported by the SDK`)
  }
}

/**
 * Map response with propery payment Type
 *
 * @param {*} response
 * @returns {AbstractPaymentType}
 */
export const mapResponsePaymentType = (response: any): AbstractPaymentType => {
  switch (response.method) {
    case 'card':
      const card: Card = new Card()
        .setPanNumber(response.number)
        .setExpiryDate(response.expiryDate)
        .setCVC(response.cvc)

      card.setId(response.id)
      return card

    case 'EPS':
      const eps: EPS = new EPS().setBic(response.bic)

      eps.setId(response.id)
      return eps
      
    case 'giropay':
      const giropay: Giropay = new Giropay()

      giropay.setId(response.id)
      return giropay
    
    case 'paypal':
      const paypal: Paypal = new Paypal()

      paypal.setId(response.id)
      return paypal

    case 'ideal':
      const ideal: Ideal = new Ideal().setBic(response.bic)

      ideal.setId(response.id)
      return ideal

    case 'invoice':
      const invoice: Invoice = new Invoice()

      invoice.setId(response.id)
      return invoice

    case 'invoice-guaranteed':
      const invoiceGuaranteed: InvoiceGuaranteed = new InvoiceGuaranteed()

      invoiceGuaranteed.setId(response.id)
      return invoiceGuaranteed

    case 'przelewy24':
      const przelewy24: Przelewy24 = new Przelewy24()

      przelewy24.setId(response.id)
      return przelewy24

    case 'prepayment':
      const prepayment: Prepayment = new Prepayment()

      prepayment.setId(response.id)
      return prepayment

    case 'sepa-direct-debit':
      const sepaDirectDebit: SepaDirectDebit = new SepaDirectDebit(response.iban)
        .setBic(response.bic)
        .setHolder(response.holder)

      sepaDirectDebit.setId(response.id)
      return sepaDirectDebit

    case 'sepa-direct-debit-guaranteed':
      const ddg: SepaDirectDebitGuaranteed = new SepaDirectDebitGuaranteed(response.iban)
        .setBic(response.bic)
        .setHolder(response.holder)

      ddg.setId(response.id)
      return ddg

    case 'sofort':
      const sofort: Sofort = new Sofort()

      sofort.setId(response.id)
      return sofort

    case 'PIS':
      const pis: PIS = new PIS()

      pis.setId(response.id)
      return pis

    case 'alipay':
      const alipay: Alipay = new Alipay()

      alipay.setId(response.id)
      return alipay

    case 'wechatpay':
      const wechatpay: WechatPay = new WechatPay()

      wechatpay.setId(response.id)
      return wechatpay
    default:
      throw new Error(`Type ${response.method} is currently not supported by the SDK`)
  }
}
