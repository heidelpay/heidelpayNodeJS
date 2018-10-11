# Heidelpay SDK NodeJS

![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)
[![Version](https://img.shields.io/npm/v/heidelpay-sdk.svg)](https://www.npmjs.com/package/@heidelpay/nodejs-sdk)

The Heidelpay SDK NodeJS provides convenient access to the Heidelpay API from
applications written in server-side JavaScript.

# **Documentation**

See the [Node API docs](https://docs.heidelpay.com/v1.0/docs/nodejs-sdk).

## Installation

Install the package with:

    npm install --save @heidelpay/nodejs-sdk

# **Usages**

> The package needs to be configured with your private key. Make sure you have it first

Using Common JS
``` js
var Heidelpay = require('@heidelpay/nodejs-sdk').default;

// Create new instance Heidelpay
var heidelpay = new Heidelpay('s-priv-...');
```

Or using ES module

``` js
import Heidelpay from '@heidelpay/nodejs-sdk';

// Create new instance Heidelpay
const heidelpay = new Heidelpay('s-priv-...');
```

Or using TypeScript:

``` ts
import Heidelpay from '@heidelpay/nodejs-sdk';

// Create new instance Heidelpay
const heidelpay = new Heidelpay('s-priv-...');
```

# **Example**
## Using Promise
> Authorize with a payment type (Card)
```js
var Heidelpay = require('@heidelpay/nodejs-sdk').default;
var Card = require('@heidelpay/nodejs-sdk').Card

// Create new instance Heidelpay
var heidelpay = new Heidelpay('s-priv-...');

// New a card with pan number and exipry date
var card = new Card('4711100000000000', '01/2022')

// Set CVC
card.setCVC('123')

// Create payment type then authorize (Card)
heidelpay.createPaymentType(card).then(function(paymentCard) {    

  // Authorize with payment card
  return paymentCard.authorize({
    amount: 100,
    currency: 'EUR',
    typeId: paymentCard.getId(),
    returnUrl: 'https://www.google.at'
  })
}).then(function(authorize) {
  // Authorize successful
  console.log('authorize', authorize.getId())
}).catch(function (error) {
  // Handle error
  console.log('error', error)
});
```

## Using async / await (ES6 style)
```js
import Heidelpay, {Card} from '@heidelpay/nodejs-sdk'

// Create new instance Heidelpay
var heidelpay = new Heidelpay('s-priv-...');

// New a card with pan number and exipry date
const card = new Card('471110xxxxxx0000', '01/xxxx')

// Set CVC
card.setCVC('xxx')

try {
  // Create payment type then authorize (Card)
  const paymentCard = await heidelpay.createPaymentType(card)

  // Authorize with payment card
  const authorize = await paymentCard.authorize({
    amount: 100,
    currency: 'EUR',
    typeId: paymentCard.getId(),
    returnUrl: 'https://www.google.at'
  })
} catch (error) {
  // Handle error
  console.log('error', error)
}
```