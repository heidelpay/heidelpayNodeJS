import Heidelpay from '../../src/Heidelpay'
import Card from "../../src/payments/types/Card"
import { authorizeObject, chargeAuthorizeObject } from "../../src/payments/business/Authorization"
import PaymentType from "../../src/payments/types/PaymentType"
import { Customer, Address, Salutation } from "../../src/payments/Customer"
import { chargeObject } from "../../src/payments/business/Charge"
import { cancelChargeObject, cancelAuthorizeObject } from "../../src/payments/business/Cancel"

export const getTimeout = () => 60000

export const createHeidelpayInstance = () => new Heidelpay('s-priv-2a102ZMq3gV4I3zJ888J7RR6u75oqK3n')
export const createHeidelpayConfigInstance = (key, config) => new Heidelpay(key, config)

export const createPaymentTypeCard = (heidelpay) => async (builder: boolean = false): Promise<Card> => {
  let card: Card = new Card()
    .setPanNumber('4711100000000000')
    .setCVC('123')
    .setExpiryDate('01/2022')

  if (builder) {
    return card
  }

  card = await heidelpay.createPaymentType(card)
  return card
}

export const createMiniumCustomer = () => {
  return new Customer("Rene", "Felder")
}

export const createFullCustomer = () => {
  const billingAddress: Address = {
    name: 'Peter Universum',
    street: 'Hugo-Junkers-Str. 5',
    state: 'DE-BO',
    zip: '60386',
    city: 'Frankfurt am Main',
    country: 'DE'
  }

  const shippingAddress: Address = {
    name: 'Peter Universum',
    street: 'Hugo-Junkers-Str. 5',
    state: 'DE-BO',
    zip: '60386',
    city: 'Frankfurt am Main',
    country: 'DE'
  }

  let customer: Customer = new Customer()
    .setFirstName('Rene')
    .setLastName('Felder')
    .setSalutation(Salutation.mr)
    .setBirthDate('1972-12-24')
    .setEmail('Rene.Felder@heidelpay.com')
    .setPhone('+49 6221 64 71 101')
    .setMobile('+49 172 123 457')
    .setBillingAddress(billingAddress)
    .setShippingAddress(shippingAddress)

  return customer
}

export const createCustomer = (heidelpay) => async (builder: boolean = false) => {
  const billingAddress: Address = {
    name: 'Peter Universum',
    street: 'Hugo-Junkers-Str. 5',
    state: 'DE-BO',
    zip: '60386',
    city: 'Frankfurt am Main',
    country: 'DE'
  }

  let customer: Customer = new Customer()
    .setFirstName('Rene')
    .setLastName('Felder')
    .setSalutation(Salutation.mr)
    .setBirthDate('1972-12-24')
    .setEmail('Rene.Felder@heidelpay.com')
    .setPhone('+49 6221 64 71 101')
    .setMobile('+49 172 123 457')
    .setBillingAddress(billingAddress)

  if (builder === true) {
    return customer
  }

  customer = await heidelpay.createCustomer(customer)
  return customer
}

export const getAuthorization = (typeId: string | PaymentType, customerId?: string | Customer) => {
  const authorizePayload: authorizeObject = {
    amount: 100,
    currency: 'EUR',
    typeId: typeId,
    returnUrl: 'https://www.google.at'
  }

  if (customerId !== undefined) {
    authorizePayload.customerId = customerId
  }

  return authorizePayload
}

export const getAuthorizationWithOrderId = (typeId: string | PaymentType, customerId?: string | Customer) => {
  const authorizePayload: authorizeObject = {
    amount: 100,
    orderId: Math.floor(Date.now() / 1000).toString(),
    currency: 'EUR',
    typeId: typeId,
    returnUrl: 'https://www.google.at'
  }

  if (customerId !== undefined) {
    authorizePayload.customerId = customerId
  }

  return authorizePayload
}

export const getCancelAuthorization = (paymentId: string, authorizeId: string, amount: number) => {
  const authorizePayload: cancelAuthorizeObject = {
    amount: amount,
    authorizationId: authorizeId,
    paymentId: paymentId
  }

  return authorizePayload
}

export const getCharge = (typeId: string | PaymentType, customerId?: string | Customer) => {
  const chargePayload: chargeObject = {
    amount: 50,
    currency: 'EUR',
    returnUrl: 'https://www.google.at',
    typeId: typeId
  }

  if (customerId !== undefined) {
    chargePayload.customerId = customerId
  }

  return chargePayload
}

export const getChargeWithOrderId = (typeId: string | PaymentType, customerId?: string | Customer) => {
  const chargePayload: chargeObject = {
    amount: 50,
    orderId: Math.floor(Date.now() / 1000).toString(),
    currency: 'EUR',
    returnUrl: 'https://www.google.at',
    typeId: typeId
  }

  if (customerId !== undefined) {
    chargePayload.customerId = customerId
  }

  return chargePayload
}

export const getChargeAuthorization = (paymentId: string, amount?: number) => {
  const chargeAuthorizePayload: chargeAuthorizeObject = {
    paymentId: paymentId,
  }

  if (amount !== undefined) {
    chargeAuthorizePayload.amount = amount
  }

  return chargeAuthorizePayload
}

export const getCancelCharge = (paymentId: string, chargeId: string, amount?: number) => {
  const cancelCharge: cancelChargeObject = {
    paymentId: paymentId,
    chargeId: chargeId,
  }

  if (amount !== undefined) {
    cancelCharge.amount = amount
  }

  return cancelCharge
}