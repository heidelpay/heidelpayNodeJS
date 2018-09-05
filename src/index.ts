const path = require('path')
require('dotenv').config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`)
})

import Heidelpay from './Heidelpay'

export default Heidelpay
