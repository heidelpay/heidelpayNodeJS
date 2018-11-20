export default (response: any) => {
  throw new Error(JSON.stringify(response.errors))
}
