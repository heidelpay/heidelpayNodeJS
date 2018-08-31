export interface RequestAdapter {
  get(payload: string): Promise<Response>
  post(payload: string, body: object): Promise<Response>
  put(payload: string, body: object): Promise<Response>
}
