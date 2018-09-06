import { FetchAdapter } from '../../src/adapters/FetchAdapter'

describe('FetchAdapter test', () => {
  it('Test create FetchAdapter', () => {
    const adapter: FetchAdapter = new FetchAdapter()

    expect(adapter).toBeInstanceOf(FetchAdapter)
  })
})
