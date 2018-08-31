import { FetchAdapter } from '../../src/adapters/FetchAdapter'
import { Config } from '../../src/Config'

describe('FetchAdapter test', () => {
  it('Test create FetchAdapter', () => {
    const config = new Config({ privateKey: 's-pri-xxx' })
    const adapter: FetchAdapter = new FetchAdapter(config)

    expect(adapter).toBeInstanceOf(FetchAdapter)
  })
})
