export default (response: any) => {
  throw new Error(response.errors[0].merchantMessage)
}
