export interface RequestAdapter {
  get(url: string, privateKey: string): Promise<Response>
  post(url: string, body: object, privateKey: string): Promise<Response>
  put(url: string, body: object, privateKey: string): Promise<Response>
}
