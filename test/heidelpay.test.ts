/*
 * @Author: Minh Tri Nguyen 
 * @Date: 2018-08-23 16:36:48 
 * @Last Modified by:   Minh Tri Nguyen 
 * @Last Modified time: 2018-08-23 16:36:48 
 */
import Heidelpay from '../src'

describe('Initial test', () => {
  it('Heidelpay is instantiable', () => {
    expect(Heidelpay.getInstance()).toBeInstanceOf(Heidelpay)
  })

  it('Heidelpay get new instance in twice', () => {
    expect(Heidelpay.getInstance()).toBeInstanceOf(Heidelpay)
    expect(Heidelpay.getInstance()).toBeInstanceOf(Heidelpay)
  })
})
