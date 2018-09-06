import fetchMock from 'fetch-mock'

import { FetchAdapter } from '../../src/adapters/FetchAdapter'

let adapter: FetchAdapter
describe('FetchAdapter test', () => {
  beforeEach(() => {
    fetchMock.restore()
    adapter = new FetchAdapter()
  })

  it('can create FetchAdapter', () => {
    expect(adapter).toBeInstanceOf(FetchAdapter)
  })

  it('can do GET request', async () => {
    const mockResponse = { success: true }
    fetchMock.get('*', { ...mockResponse })

    const response = await adapter.get('/test', 's-pri-xxx')
    expect(response).toEqual(mockResponse)
  })

  it('can do POST request', async () => {
    const mockResponse = { data: 2 }
    fetchMock.post('*', { ...mockResponse })

    const response = await adapter.post('/test', { data: 1 }, 's-pri-xxx')
    expect(response).toEqual(mockResponse)
  })

  it('can do PUT request', async () => {
    const mockResponse = { data: 2 }
    fetchMock.put('*', { ...mockResponse })

    const response = await adapter.put('/test', { data: 1 }, 's-pri-xxx')
    expect(response).toEqual(mockResponse)
  })

  it('can do DELETE request', async () => {
    const mockResponse = { data: 2 }
    fetchMock.delete('*', { ...mockResponse })

    const response = await adapter.delete('/test', { data: 1 }, 's-pri-xxx')
    expect(response).toEqual(mockResponse)
  })
})
