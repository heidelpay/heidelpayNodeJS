import Card from '../payments/types/Card'
import AbstractPaymentType from '../payments/types/AbstractPaymentType'

export const replaceUrl = (url: string, args: any) => {
  const regex = /{([a-zA-Z]+)}/gm

  const urlReplaced = url.replace(regex, (matches, item) => {
    return args[item] || ''
  })

  return urlReplaced
}

export const getPaymentTypeFromTypeId = (typeId: string): AbstractPaymentType => {
  if (typeId.length < 5) {
    throw new Error(`Type ${typeId} is currently not supported by the SDK`)
  }

  const paymentType = typeId.substring(2, 5)
  switch (paymentType) {
    case 'crd':
      return new Card()
    default:
      throw new Error(`Type ${typeId} is currently not supported by the SDK`)
  }
}

export const mapResponsePaymentType = (response: any): AbstractPaymentType => {
  switch (response.method) {
    case 'card':
      const card: Card = new Card()
        .setPanNumber(response.number)
        .setExpiryDate(response.expiry)
        .setCVC(response.cvv)

      card.setId(response.id)

      return card
    default:
      throw new Error(`Type ${response.method} is currently not supported by the SDK`)
  }
}
